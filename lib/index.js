"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildShownItems = exports.getIconClass = exports.renderGroup = exports.renderGroups = exports.GroupItems = exports.Groups = void 0;
var link_1 = require("next/link");
var React = require("react");
function Groups(props) {
  return (React.createElement('div', { className: props.className }, React.createElement('header', null, React.createElement('h2', null, props.title)), React.createElement('br', null), React.createElement('br', null), React.createElement(GroupItems, { groups: props.groups, resource: props.resource, className: props.groupClass, headerClass: props.headerClass, subClass: props.subClass })));
}
exports.Groups = Groups;
function GroupItems(props) {
  return (React.createElement(React.Fragment, null, React.createElement('section', { className: props.className }, (0, exports.renderGroups)(props.groups, props.resource, props.headerClass, props.subClass))));
}
exports.GroupItems = GroupItems;
exports.default = GroupItems;
var renderGroups = function (items, resource, headerClass, subClass) {
  return items.map(function (form, idx) {
    return (0, exports.renderGroup)(form, idx, resource, headerClass, subClass);
  });
};
exports.renderGroups = renderGroups;
var renderGroup = function (item, idx, resource, headerClass, subClass) {
  var name = item.name;
  if (resource && item.resource) {
    var text = resource[item.resource];
    name = !text || text.length === 0 ? item.name : text;
  }
  var className = getIconClass(item.icon);
  if (item.children && Array.isArray(item.children) && item.children.length > 0) {
    var subs = item.children;
    return (React.createElement('label', { className: headerClass, key: idx }, React.createElement('div', null, React.createElement('i', { className: 'material-icons group-header' }, className), React.createElement('span', { className: 'group-header' }, name)), React.createElement('ul', { className: 'group-ul' }, (0, exports.renderGroups)(subs, resource, headerClass, subClass)), React.createElement('hr', null)));
  }
  else {
    return (React.createElement('label', { className: subClass, key: idx }, React.createElement(link_1.default, { href: item.path }, React.createElement('div', null, React.createElement('i', { className: 'material-icons' }, className), React.createElement('span', null, name)))));
  }
};
exports.renderGroup = renderGroup;
function getIconClass(icon) {
  return !icon || icon.length === 0 ? 'settings' : icon;
}
exports.getIconClass = getIconClass;
function buildShownItems(keyword, items) {
  if (!keyword || keyword === '') {
    return items;
  }
  var w = keyword.toLowerCase();
  var shownItems = items.map(function (parent) {
    var parentCopy = Object.assign({}, parent);
    if (parentCopy.children) {
      parentCopy.children = parentCopy.children.filter(function (child) { return child.name.toLowerCase().includes(w); });
    }
    return parentCopy;
  }).filter(function (item) { return (item.children && item.children.length > 0) || item.name.toLowerCase().includes(w); });
  return shownItems;
}
exports.buildShownItems = buildShownItems;
