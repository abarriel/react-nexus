export default function isReactCompositeComponent(component) {
  if (typeof component.prototype === 'object') {
    if (component.prototype.isReactComponent || component.prototype.isPureReactComponent) {
      return true;
    }
  }
  return false;
}
