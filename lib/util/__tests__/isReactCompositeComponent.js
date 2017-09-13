import React from 'react';
import isReactCompositeComponent from '../isReactCompositeComponent';
import should from 'should/as-function';
const { describe, it } = global;

describe('isReactCompositeComponent(type)', () => {
  it('returns true on React.Component', () => {
    class C extends React.Component {
      render() {
        return null;
      }
    }
    should(isReactCompositeComponent(C)).be.true();
  });
  it('returns true on React.PureComponent', () => {
    class C extends React.PureComponent {
      render() {
        return null;
      }
    }
    should(isReactCompositeComponent(C)).be.true();
  });
  it('returns false on a functional component', () => {
    const C = () => (<div>{'foo'}</div>);
    should(isReactCompositeComponent(C)).be.false();
  });
});
