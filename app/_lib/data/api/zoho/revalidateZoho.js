/**
 * Revalidates the Zoho access token, either by retrieving a cached token,
 * fetching it from the database, or generating a new one if necessary.
 *
 * @async
 * @function revalidateZoho
 * @returns {Promise<{ access_token: string, expiration_time: number }>}
 *   - An object containing the access token and its expiration time.
 * @throws {Error} If there is an issue with fetching the token from the database, generating a new token, or updating the database with the new token.
 *
 * @example
 * const { access_token, expiration_time } = await revalidateZoho();
 * console.log(`Access Token: ${access_token}, Expiration Time: ${expiration_time}`);
 */

let refreshingPromise = null;

let REFRESH_TOKEN = process.env.REFRESH_TOKEN;
let ACCESS_TOKEN = null;
let EXPIRATION_TIME = null;

const TOKEN_EXPIRATION_BUFFER = 300;

import { isTokenValid, calculateExpirationTime } from '@lib/helperShared';

async function revalidateZoho() {
  if (refreshingPromise) {
    await refreshingPromise;
    return { access_token: ACCESS_TOKEN, expiration_time: EXPIRATION_TIME };
  }

  try {
    // returns cached token if it's still valid on this server instance
    if (ACCESS_TOKEN && EXPIRATION_TIME && Date.now() < EXPIRATION_TIME) {
      console.log('Token from cache');
    } else {
      //if no cached token on server instance, checks the db to see if any other instance hs created a new token
      const { data: dbTokenData, error: dbError } = await supabase
        .from('zohoAuthToken')
        .select('*')
        .limit(1);

      if (dbError)
        throw new Error(`Database query for token failed: ${dbError.message}`);
      console.log(dbTokenData);

      if (dbTokenData?.length > 0) {
        const { token, expiration_time } = dbTokenData[0];
        if (isTokenValid(new Date(expiration_time).getTime())) {
          ACCESS_TOKEN = token;
          EXPIRATION_TIME = new Date(expiration_time).getTime();
          console.log('Token from DB');
        } else {
          throw new Error('Token expired in DB; needs refresh');
        }
      } else {
        throw new Error('No token found in DB; needs refresh');
      }
    }

    return { access_token: ACCESS_TOKEN, expiration_time: EXPIRATION_TIME };
  } catch (error) {
    //if no valid token from either this server instance or from the database, generate a new token
    refreshingPromise = (async () => {
      const params = new URLSearchParams({
        refresh_token: REFRESH_TOKEN,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        grant_type: 'refresh_token',
      });

      const res = await fetch(
        `https://accounts.zoho.eu/oauth/v2/token?${params.toString()}`,
        {
          method: 'POST',
        },
      );

      if (!res.ok) {
        throw new Error(`Network response was not ok: ${res.statusText}`);
      }

      const { access_token, expires_in } = await res.json();

      const expirationTime = calculateExpirationTime(
        expires_in,
        TOKEN_EXPIRATION_BUFFER,
      );
      const expirationTimeISO = new Date(expirationTime).toISOString();

      //update db with new token data
      const { error: updateError } = await supabase
        .from('zohoAuthToken')
        .update({ token: access_token, expiration_time: expirationTimeISO })
        .eq('id', 1);

      if (updateError)
        throw new Error(
          `Failed to update database with token: ${updateError.message}`,
        );

      //save the token and expiration date in cached memory
      ACCESS_TOKEN = access_token;
      EXPIRATION_TIME = expirationTime;

      console.log('Updated from API');
    })();

    await refreshingPromise;
    return { access_token: ACCESS_TOKEN, expiration_time: EXPIRATION_TIME };
  } finally {
    refreshingPromise = null;
  }
}

export default revalidateZoho;
