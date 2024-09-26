import { Transition } from 'react-transition-group';
import { useRef, useEffect, useState } from 'react';

const durationOpacity = 200;
const durationHeight = 400;

const defaultStyle = {
  transition: `opacity ${durationOpacity}ms ease-in-out, height ${durationHeight}ms ease-in-out`,
  opacity: 0,
  height: 0,
  overflow: 'hidden',
};

const transitionStyles = {
  entering: { opacity: 1, height: 'auto' },
  entered: { opacity: 1, height: 'auto' },
  exiting: { opacity: 0, height: 0 },
  exited: { opacity: 0, height: 0 },
};

function Fade({ in: inProp, children, unmountOnExit = false }) {
  const nodeRef = useRef(null);
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState('0px');

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(`${contentRef.current.scrollHeight}px`);
    }
  }, [children]);

  return (
    <Transition
      nodeRef={nodeRef}
      in={inProp}
      timeout={durationHeight}
      unmountOnExit={unmountOnExit}
      onEntering={() =>
        setContentHeight(`${contentRef.current.scrollHeight}px`)
      }
      onExiting={() => setContentHeight('0px')}
    >
      {(state) => (
        <div
          ref={nodeRef}
          style={{
            ...defaultStyle,
            ...transitionStyles[state],
            height: state === 'exiting' ? '0px' : contentHeight,
          }}
        >
          <div
            ref={contentRef}
            style={{ visibility: inProp ? 'visible' : 'hidden' }}
          >
            {children}
          </div>
        </div>
      )}
    </Transition>
  );
}

export default Fade;
