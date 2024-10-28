import type { HTMLDataV1 } from 'vscode-html-languageservice'

export const vueTemplateBuiltinData: HTMLDataV1 = {
  version: 1.1,
  tags: [
    {
      name: 'Transition',
      description: {
        kind: 'markdown',
        value: '\nProvides animated transition effects to a **single** element or component.\n\n- **Props**\n\n  ```ts\n  interface TransitionProps {\n    /**\n     * Used to automatically generate transition CSS class names.\n     * e.g. `name: \'fade\'` will auto expand to `.fade-enter`,\n     * `.fade-enter-active`, etc.\n     */\n    name?: string\n    /**\n     * Whether to apply CSS transition classes.\n     * Default: true\n     */\n    css?: boolean\n    /**\n     * Specifies the type of transition events to wait for to\n     * determine transition end timing.\n     * Default behavior is auto detecting the type that has\n     * longer duration.\n     */\n    type?: \'transition\' | \'animation\'\n    /**\n     * Specifies explicit durations of the transition.\n     * Default behavior is wait for the first `transitionend`\n     * or `animationend` event on the root transition element.\n     */\n    duration?: number | { enter: number; leave: number }\n    /**\n     * Controls the timing sequence of leaving/entering transitions.\n     * Default behavior is simultaneous.\n     */\n    mode?: \'in-out\' | \'out-in\' | \'default\'\n    /**\n     * Whether to apply transition on initial render.\n     * Default: false\n     */\n    appear?: boolean\n\n    /**\n     * Props for customizing transition classes.\n     * Use kebab-case in templates, e.g. enter-from-class="xxx"\n     */\n    enterFromClass?: string\n    enterActiveClass?: string\n    enterToClass?: string\n    appearFromClass?: string\n    appearActiveClass?: string\n    appearToClass?: string\n    leaveFromClass?: string\n    leaveActiveClass?: string\n    leaveToClass?: string\n  }\n  ```\n\n- **Events**\n\n  - `@before-enter`\n  - `@before-leave`\n  - `@enter`\n  - `@leave`\n  - `@appear`\n  - `@after-enter`\n  - `@after-leave`\n  - `@after-appear`\n  - `@enter-cancelled`\n  - `@leave-cancelled` (`v-show` only)\n  - `@appear-cancelled`\n\n- **Example**\n\n  Simple element:\n\n  ```html\n  <Transition>\n    <div v-if="ok">toggled content</div>\n  </Transition>\n  ```\n\n  Forcing a transition by changing the `key` attribute:\n\n  ```html\n  <Transition>\n    <div :key="text">{{ text }}</div>\n  </Transition>\n  ```\n\n  Dynamic component, with transition mode + animate on appear:\n\n  ```html\n  <Transition name="fade" mode="out-in" appear>\n    <component :is="view"></component>\n  </Transition>\n  ```\n\n  Listening to transition events:\n\n  ```html\n  <Transition @after-enter="onTransitionComplete">\n    <div v-show="ok">toggled content</div>\n  </Transition>\n  ```\n\n- **See also** [Guide - Transition](https://vuejs.org/guide/built-ins/transition.html)\n',
      },
      attributes: [],
    },
    {
      name: 'TransitionGroup',
      description: {
        kind: 'markdown',
        value: '\nProvides transition effects for **multiple** elements or components in a list.\n\n- **Props**\n\n  `<TransitionGroup>` accepts the same props as `<Transition>` except `mode`, plus two additional props:\n\n  ```ts\n  interface TransitionGroupProps extends Omit<TransitionProps, \'mode\'> {\n    /**\n     * If not defined, renders as a fragment.\n     */\n    tag?: string\n    /**\n     * For customizing the CSS class applied during move transitions.\n     * Use kebab-case in templates, e.g. move-class="xxx"\n     */\n    moveClass?: string\n  }\n  ```\n\n- **Events**\n\n  `<TransitionGroup>` emits the same events as `<Transition>`.\n\n- **Details**\n\n  By default, `<TransitionGroup>` doesn\'t render a wrapper DOM element, but one can be defined via the `tag` prop.\n\n  Note that every child in a `<transition-group>` must be [**uniquely keyed**](https://vuejs.org/guide/essentials/list.html#maintaining-state-with-key) for the animations to work properly.\n\n  `<TransitionGroup>` supports moving transitions via CSS transform. When a child\'s position on screen has changed after an update, it will get applied a moving CSS class (auto generated from the `name` attribute or configured with the `move-class` prop). If the CSS `transform` property is "transition-able" when the moving class is applied, the element will be smoothly animated to its destination using the [FLIP technique](https://aerotwist.com/blog/flip-your-animations/).\n\n- **Example**\n\n  ```html\n  <TransitionGroup tag="ul" name="slide">\n    <li v-for="item in items" :key="item.id">\n      {{ item.text }}\n    </li>\n  </TransitionGroup>\n  ```\n\n- **See also** [Guide - TransitionGroup](https://vuejs.org/guide/built-ins/transition-group.html)\n',
      },
      attributes: [],
    },
    {
      name: 'KeepAlive',
      description: {
        kind: 'markdown',
        value: '\nCaches dynamically toggled components wrapped inside.\n\n- **Props**\n\n  ```ts\n  interface KeepAliveProps {\n    /**\n     * If specified, only components with names matched by\n     * `include` will be cached.\n     */\n    include?: MatchPattern\n    /**\n     * Any component with a name matched by `exclude` will\n     * not be cached.\n     */\n    exclude?: MatchPattern\n    /**\n     * The maximum number of component instances to cache.\n     */\n    max?: number | string\n  }\n\n  type MatchPattern = string | RegExp | (string | RegExp)[]\n  ```\n\n- **Details**\n\n  When wrapped around a dynamic component, `<KeepAlive>` caches the inactive component instances without destroying them.\n\n  There can only be one active component instance as the direct child of `<KeepAlive>` at any time.\n\n  When a component is toggled inside `<KeepAlive>`, its `activated` and `deactivated` lifecycle hooks will be invoked accordingly, providing an alternative to `mounted` and `unmounted`, which are not called. This applies to the direct child of `<KeepAlive>` as well as to all of its descendants.\n\n- **Example**\n\n  Basic usage:\n\n  ```html\n  <KeepAlive>\n    <component :is="view"></component>\n  </KeepAlive>\n  ```\n\n  When used with `v-if` / `v-else` branches, there must be only one component rendered at a time:\n\n  ```html\n  <KeepAlive>\n    <comp-a v-if="a > 1"></comp-a>\n    <comp-b v-else></comp-b>\n  </KeepAlive>\n  ```\n\n  Used together with `<Transition>`:\n\n  ```html\n  <Transition>\n    <KeepAlive>\n      <component :is="view"></component>\n    </KeepAlive>\n  </Transition>\n  ```\n\n  Using `include` / `exclude`:\n\n  ```html\n  <!-- comma-delimited string -->\n  <KeepAlive include="a,b">\n    <component :is="view"></component>\n  </KeepAlive>\n\n  <!-- regex (use `v-bind`) -->\n  <KeepAlive :include="/a|b/">\n    <component :is="view"></component>\n  </KeepAlive>\n\n  <!-- Array (use `v-bind`) -->\n  <KeepAlive :include="[\'a\', \'b\']">\n    <component :is="view"></component>\n  </KeepAlive>\n  ```\n\n  Usage with `max`:\n\n  ```html\n  <KeepAlive :max="10">\n    <component :is="view"></component>\n  </KeepAlive>\n  ```\n\n- **See also** [Guide - KeepAlive](https://vuejs.org/guide/built-ins/keep-alive.html)\n',
      },
      attributes: [],
    },
    {
      name: 'Teleport',
      description: {
        kind: 'markdown',
        value: '\nRenders its slot content to another part of the DOM.\n\n- **Props**\n\n  ```ts\n  interface TeleportProps {\n    /**\n     * Required. Specify target container.\n     * Can either be a selector or an actual element.\n     */\n    to: string | HTMLElement\n    /**\n     * When `true`, the content will remain in its original\n     * location instead of moved into the target container.\n     * Can be changed dynamically.\n     */\n    disabled?: boolean\n  }\n  ```\n\n- **Example**\n\n  Specifying target container:\n\n  ```html\n  <Teleport to="#some-id" />\n  <Teleport to=".some-class" />\n  <Teleport to="[data-teleport]" />\n  ```\n\n  Conditionally disabling:\n\n  ```html\n  <Teleport to="#popup" :disabled="displayVideoInline">\n    <video src="./my-movie.mp4">\n  </Teleport>\n  ```\n\n- **See also** [Guide - Teleport](https://vuejs.org/guide/built-ins/teleport.html)\n',
      },
      attributes: [],
    },
    {
      name: 'Suspense',
      description: {
        kind: 'markdown',
        value: '\nUsed for orchestrating nested async dependencies in a component tree.\n\n- **Props**\n\n  ```ts\n  interface SuspenseProps {\n    timeout?: string | number\n    suspensible?: boolean\n  }\n  ```\n\n- **Events**\n\n  - `@resolve`\n  - `@pending`\n  - `@fallback`\n\n- **Details**\n\n  `<Suspense>` accepts two slots: the `#default` slot and the `#fallback` slot. It will display the content of the fallback slot while rendering the default slot in memory.\n\n  If it encounters async dependencies ([Async Components](https://vuejs.org/guide/components/async.html) and components with [`async setup()`](https://vuejs.org/guide/built-ins/suspense.html#async-setup)) while rendering the default slot, it will wait until all of them are resolved before displaying the default slot.\n\n  By setting the Suspense as `suspensible`, all the async dependency handling will be handled by the parent Suspense. See [implementation details](https://github.com/vuejs/core/pull/6736)\n\n- **See also** [Guide - Suspense](https://vuejs.org/guide/built-ins/suspense.html)\n',
      },
      attributes: [],
    },
    {
      name: 'component',
      description: {
        kind: 'markdown',
        value: '\nA "meta component" for rendering dynamic components or elements.\n\n- **Props**\n\n  ```ts\n  interface DynamicComponentProps {\n    is: string | Component\n  }\n  ```\n\n- **Details**\n\n  The actual component to render is determined by the `is` prop.\n\n  - When `is` is a string, it could be either an HTML tag name or a component\'s registered name.\n\n  - Alternatively, `is` can also be directly bound to the definition of a component.\n\n- **Example**\n\n  Rendering components by registered name (Options API):\n\n  ```vue\n  <script>\n  import Foo from \'./Foo.vue\'\n  import Bar from \'./Bar.vue\'\n\n  export default {\n    components: { Foo, Bar },\n    data() {\n      return {\n        view: \'Foo\'\n      }\n    }\n  }\n  </script>\n\n  <template>\n    <component :is="view" />\n  </template>\n  ```\n\n  Rendering components by definition (Composition API with `<script setup>`):\n\n  ```vue\n  <script setup>\n  import Foo from \'./Foo.vue\'\n  import Bar from \'./Bar.vue\'\n  </script>\n\n  <template>\n    <component :is="Math.random() > 0.5 ? Foo : Bar" />\n  </template>\n  ```\n\n  Rendering HTML elements:\n\n  ```html\n  <component :is="href ? \'a\' : \'span\'"></component>\n  ```\n\n  The [built-in components](./built-in-components) can all be passed to `is`, but you must register them if you want to pass them by name. For example:\n\n  ```vue\n  <script>\n  import { Transition, TransitionGroup } from \'vue\'\n\n  export default {\n    components: {\n      Transition,\n      TransitionGroup\n    }\n  }\n  </script>\n\n  <template>\n    <component :is="isGroup ? \'TransitionGroup\' : \'Transition\'">\n      ...\n    </component>\n  </template>\n  ```\n\n  Registration is not required if you pass the component itself to `is` rather than its name, e.g. in `<script setup>`.\n\n  If `v-model` is used on a `<component>` tag, the template compiler will expand it to a `modelValue` prop and `update:modelValue` event listener, much like it would for any other component. However, this won\'t be compatible with native HTML elements, such as `<input>` or `<select>`. As a result, using `v-model` with a dynamically created native element won\'t work:\n\n  ```vue\n  <script setup>\n  import { ref } from \'vue\'\n\n  const tag = ref(\'input\')\n  const username = ref(\'\')\n  </script>\n\n  <template>\n    <!-- This won\'t work as \'input\' is a native HTML element -->\n    <component :is="tag" v-model="username" />\n  </template>\n  ```\n\n  In practice, this edge case isn\'t common as native form fields are typically wrapped in components in real applications. If you do need to use a native element directly then you can split the `v-model` into an attribute and event manually.\n\n- **See also** [Dynamic Components](https://vuejs.org/guide/essentials/component-basics.html#dynamic-components)\n',
      },
      attributes: [],
    },
    {
      name: 'slot',
      description: {
        kind: 'markdown',
        value: '\nDenotes slot content outlets in templates.\n\n- **Props**\n\n  ```ts\n  interface SlotProps {\n    /**\n     * Any props passed to <slot> to passed as arguments\n     * for scoped slots\n     */\n    [key: string]: any\n    /**\n     * Reserved for specifying slot name.\n     */\n    name?: string\n  }\n  ```\n\n- **Details**\n\n  The `<slot>` element can use the `name` attribute to specify a slot name. When no `name` is specified, it will render the default slot. Additional attributes passed to the slot element will be passed as slot props to the scoped slot defined in the parent.\n\n  The element itself will be replaced by its matched slot content.\n\n  `<slot>` elements in Vue templates are compiled into JavaScript, so they are not to be confused with [native `<slot>` elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot).\n\n- **See also** [Component - Slots](https://vuejs.org/guide/components/slots.html)\n',
      },
      attributes: [],
    },
  ],
  globalAttributes: [
    {
      name: 'v-text',
      description: {
        kind: 'markdown',
        value: '\nUpdate the element\'s text content.\n\n- **Expects:** `string`\n\n- **Details**\n\n  `v-text` works by setting the element\'s [textContent](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent) property, so it will overwrite any existing content inside the element. If you need to update the part of `textContent`, you should use [mustache interpolations](https://vuejs.org/guide/essentials/template-syntax.html#text-interpolation) instead.\n\n- **Example**\n\n  ```html\n  <span v-text="msg"></span>\n  <!-- same as -->\n  <span>{{msg}}</span>\n  ```\n\n- **See also** [Template Syntax - Text Interpolation](https://vuejs.org/guide/essentials/template-syntax.html#text-interpolation)\n',
      },
      references: [
        {
          name: 'en',
          url: 'https://vuejs.org/api/built-in-directives.html#v-text',
        },
        {
          name: 'zh-cn',
          url: 'https://cn.vuejs.org/api/built-in-directives.html#v-text',
        },
        {
          name: 'zh-hk',
          url: 'https://zh-hk.vuejs.org/api/built-in-directives.html#v-text',
        },
        {
          name: 'ja',
          url: 'https://ja.vuejs.org/api/built-in-directives.html#v-text',
        },
        {
          name: 'ua',
          url: 'https://ua.vuejs.org/api/built-in-directives.html#v-text',
        },
        {
          name: 'fr',
          url: 'https://fr.vuejs.org/api/built-in-directives.html#v-text',
        },
        {
          name: 'ko',
          url: 'https://ko.vuejs.org/api/built-in-directives.html#v-text',
        },
        {
          name: 'pt',
          url: 'https://pt.vuejs.org/api/built-in-directives.html#v-text',
        },
        {
          name: 'bn',
          url: 'https://bn.vuejs.org/api/built-in-directives.html#v-text',
        },
        {
          name: 'it',
          url: 'https://it.vuejs.org/api/built-in-directives.html#v-text',
        },
        {
          name: 'cs',
          url: 'https://cs.vuejs.org/api/built-in-directives.html#v-text',
        },
        {
          name: 'ru',
          url: 'https://ru.vuejs.org/api/built-in-directives.html#v-text',
        },
        {
          name: 'fa',
          url: 'https://fa.vuejs.org/api/built-in-directives.html#v-text',
        },
      ],
    },
    {
      name: 'v-html',
      description: {
        kind: 'markdown',
        value: '\nUpdate the element\'s [innerHTML](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML).\n\n- **Expects:** `string`\n\n- **Details**\n\n  Contents of `v-html` are inserted as plain HTML - Vue template syntax will not be processed. If you find yourself trying to compose templates using `v-html`, try to rethink the solution by using components instead.\n\n  ::: warning Security Note\n  Dynamically rendering arbitrary HTML on your website can be very dangerous because it can easily lead to [XSS attacks](https://en.wikipedia.org/wiki/Cross-site_scripting). Only use `v-html` on trusted content and **never** on user-provided content.\n  :::\n\n  In [Single-File Components](https://vuejs.org/guide/scaling-up/sfc.html), `scoped` styles will not apply to content inside `v-html`, because that HTML is not processed by Vue\'s template compiler. If you want to target `v-html` content with scoped CSS, you can instead use [CSS modules](./sfc-css-features#css-modules) or an additional, global `<style>` element with a manual scoping strategy such as BEM.\n\n- **Example**\n\n  ```html\n  <div v-html="html"></div>\n  ```\n\n- **See also** [Template Syntax - Raw HTML](https://vuejs.org/guide/essentials/template-syntax.html#raw-html)\n',
      },
      references: [
        {
          name: 'en',
          url: 'https://vuejs.org/api/built-in-directives.html#v-html',
        },
        {
          name: 'zh-cn',
          url: 'https://cn.vuejs.org/api/built-in-directives.html#v-html',
        },
      ],
    },
    {
      name: 'v-show',
      description: {
        kind: 'markdown',
        value: '\nToggle the element\'s visibility based on the truthy-ness of the expression value.\n\n- **Expects:** `any`\n\n- **Details**\n\n  `v-show` works by setting the `display` CSS property via inline styles, and will try to respect the initial `display` value when the element is visible. It also triggers transitions when its condition changes.\n\n- **See also** [Conditional Rendering - v-show](https://vuejs.org/guide/essentials/conditional.html#v-show)\n',
      },
      references: [
        {
          name: 'en',
          url: 'https://vuejs.org/api/built-in-directives.html#v-show',
        },
        {
          name: 'zh-cn',
          url: 'https://cn.vuejs.org/api/built-in-directives.html#v-show',
        },
      ],
    },
    {
      name: 'v-if',
      description: {
        kind: 'markdown',
        value: '\nConditionally render an element or a template fragment based on the truthy-ness of the expression value.\n\n- **Expects:** `any`\n\n- **Details**\n\n  When a `v-if` element is toggled, the element and its contained directives / components are destroyed and re-constructed. If the initial condition is falsy, then the inner content won\'t be rendered at all.\n\n  Can be used on `<template>` to denote a conditional block containing only text or multiple elements.\n\n  This directive triggers transitions when its condition changes.\n\n  When used together, `v-if` has a higher priority than `v-for`. We don\'t recommend using these two directives together on one element — see the [list rendering guide](https://vuejs.org/guide/essentials/list.html#v-for-with-v-if) for details.\n\n- **See also** [Conditional Rendering - v-if](https://vuejs.org/guide/essentials/conditional.html#v-if)\n',
      },
      references: [
        {
          name: 'en',
          url: 'https://vuejs.org/api/built-in-directives.html#v-if',
        },
        {
          name: 'zh-cn',
          url: 'https://cn.vuejs.org/api/built-in-directives.html#v-if',
        },
      ],
    },
    {
      name: 'v-else',
      valueSet: 'v',
      description: {
        kind: 'markdown',
        value: '\nDenote the "else block" for `v-if` or a `v-if` / `v-else-if` chain.\n\n- **Does not expect expression**\n\n- **Details**\n\n  - Restriction: previous sibling element must have `v-if` or `v-else-if`.\n\n  - Can be used on `<template>` to denote a conditional block containing only text or multiple elements.\n\n- **Example**\n\n  ```html\n  <div v-if="Math.random() > 0.5">\n    Now you see me\n  </div>\n  <div v-else>\n    Now you don\'t\n  </div>\n  ```\n\n- **See also** [Conditional Rendering - v-else](https://vuejs.org/guide/essentials/conditional.html#v-else)\n',
      },
      references: [
        {
          name: 'en',
          url: 'https://vuejs.org/api/built-in-directives.html#v-else',
        },
        {
          name: 'zh-cn',
          url: 'https://cn.vuejs.org/api/built-in-directives.html#v-else',
        },
      ],
    },
    {
      name: 'v-else-if',
      description: {
        kind: 'markdown',
        value: '\nDenote the "else if block" for `v-if`. Can be chained.\n\n- **Expects:** `any`\n\n- **Details**\n\n  - Restriction: previous sibling element must have `v-if` or `v-else-if`.\n\n  - Can be used on `<template>` to denote a conditional block containing only text or multiple elements.\n\n- **Example**\n\n  ```html\n  <div v-if="type === \'A\'">\n    A\n  </div>\n  <div v-else-if="type === \'B\'">\n    B\n  </div>\n  <div v-else-if="type === \'C\'">\n    C\n  </div>\n  <div v-else>\n    Not A/B/C\n  </div>\n  ```\n\n- **See also** [Conditional Rendering - v-else-if](https://vuejs.org/guide/essentials/conditional.html#v-else-if)\n',
      },
      references: [
        {
          name: 'en',
          url: 'https://vuejs.org/api/built-in-directives.html#v-else-if',
        },
        {
          name: 'zh-cn',
          url: 'https://cn.vuejs.org/api/built-in-directives.html#v-else-if',
        },
      ],
    },
    {
      name: 'v-for',
      description: {
        kind: 'markdown',
        value: '\nRender the element or template block multiple times based on the source data.\n\n- **Expects:** `Array | Object | number | string | Iterable`\n\n- **Details**\n\n  The directive\'s value must use the special syntax `alias in expression` to provide an alias for the current element being iterated on:\n\n  ```html\n  <div v-for="item in items">\n    {{ item.text }}\n  </div>\n  ```\n\n  Alternatively, you can also specify an alias for the index (or the key if used on an Object):\n\n  ```html\n  <div v-for="(item, index) in items"></div>\n  <div v-for="(value, key) in object"></div>\n  <div v-for="(value, name, index) in object"></div>\n  ```\n\n  The default behavior of `v-for` will try to patch the elements in-place without moving them. To force it to reorder elements, you should provide an ordering hint with the `key` special attribute:\n\n  ```html\n  <div v-for="item in items" :key="item.id">\n    {{ item.text }}\n  </div>\n  ```\n\n  `v-for` can also work on values that implement the [Iterable Protocol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterable_protocol), including native `Map` and `Set`.\n\n- **See also**\n  - [List Rendering](https://vuejs.org/guide/essentials/list.html)\n',
      },
      references: [
        {
          name: 'en',
          url: 'https://vuejs.org/api/built-in-directives.html#v-for',
        },
        {
          name: 'zh-cn',
          url: 'https://cn.vuejs.org/api/built-in-directives.html#v-for',
        },
      ],
    },
    {
      name: 'v-on',
      description: {
        kind: 'markdown',
        value: '\nAttach an event listener to the element.\n\n- **Shorthand:** `@`\n\n- **Expects:** `Function | Inline Statement | Object (without argument)`\n\n- **Argument:** `event` (optional if using Object syntax)\n\n- **Modifiers**\n\n  - `.stop` - call `event.stopPropagation()`.\n  - `.prevent` - call `event.preventDefault()`.\n  - `.capture` - add event listener in capture mode.\n  - `.self` - only trigger handler if event was dispatched from this element.\n  - `.{keyAlias}` - only trigger handler on certain keys.\n  - `.once` - trigger handler at most once.\n  - `.left` - only trigger handler for left button mouse events.\n  - `.right` - only trigger handler for right button mouse events.\n  - `.middle` - only trigger handler for middle button mouse events.\n  - `.passive` - attaches a DOM event with `{ passive: true }`.\n\n- **Details**\n\n  The event type is denoted by the argument. The expression can be a method name, an inline statement, or omitted if there are modifiers present.\n\n  When used on a normal element, it listens to [**native DOM events**](https://developer.mozilla.org/en-US/docs/Web/Events) only. When used on a custom element component, it listens to **custom events** emitted on that child component.\n\n  When listening to native DOM events, the method receives the native event as the only argument. If using inline statement, the statement has access to the special `$event` property: `v-on:click="handle(\'ok\', $event)"`.\n\n  `v-on` also supports binding to an object of event / listener pairs without an argument. Note when using the object syntax, it does not support any modifiers.\n\n- **Example**\n\n  ```html\n  <!-- method handler -->\n  <button v-on:click="doThis"></button>\n\n  <!-- dynamic event -->\n  <button v-on:[event]="doThis"></button>\n\n  <!-- inline statement -->\n  <button v-on:click="doThat(\'hello\', $event)"></button>\n\n  <!-- shorthand -->\n  <button @click="doThis"></button>\n\n  <!-- shorthand dynamic event -->\n  <button @[event]="doThis"></button>\n\n  <!-- stop propagation -->\n  <button @click.stop="doThis"></button>\n\n  <!-- prevent default -->\n  <button @click.prevent="doThis"></button>\n\n  <!-- prevent default without expression -->\n  <form @submit.prevent></form>\n\n  <!-- chain modifiers -->\n  <button @click.stop.prevent="doThis"></button>\n\n  <!-- key modifier using keyAlias -->\n  <input @keyup.enter="onEnter" />\n\n  <!-- the click event will be triggered at most once -->\n  <button v-on:click.once="doThis"></button>\n\n  <!-- object syntax -->\n  <button v-on="{ mousedown: doThis, mouseup: doThat }"></button>\n  ```\n\n  Listening to custom events on a child component (the handler is called when "my-event" is emitted on the child):\n\n  ```html\n  <MyComponent @my-event="handleThis" />\n\n  <!-- inline statement -->\n  <MyComponent @my-event="handleThis(123, $event)" />\n  ```\n\n- **See also**\n  - [Event Handling](https://vuejs.org/guide/essentials/event-handling.html)\n  - [Components - Custom Events](https://vuejs.org/guide/essentials/component-basics.html#listening-to-events)\n',
      },
      references: [
        {
          name: 'en',
          url: 'https://vuejs.org/api/built-in-directives.html#v-on',
        },
        {
          name: 'zh-cn',
          url: 'https://cn.vuejs.org/api/built-in-directives.html#v-on',
        },
      ],
    },
    {
      name: 'v-bind',
      description: {
        kind: 'markdown',
        value: '\nDynamically bind one or more attributes, or a component prop to an expression.\n\n- **Shorthand:**\n  - `:` or `.` (when using `.prop` modifier)\n  - Omitting value (when attribute and bound value has the same name, requires 3.4+)\n\n- **Expects:** `any (with argument) | Object (without argument)`\n\n- **Argument:** `attrOrProp (optional)`\n\n- **Modifiers**\n\n  - `.camel` - transform the kebab-case attribute name into camelCase.\n  - `.prop` - force a binding to be set as a DOM property (3.2+).\n  - `.attr` - force a binding to be set as a DOM attribute (3.2+).\n\n- **Usage**\n\n  When used to bind the `class` or `style` attribute, `v-bind` supports additional value types such as Array or Objects. See linked guide section below for more details.\n\n  When setting a binding on an element, Vue by default checks whether the element has the key defined as a property using an `in` operator check. If the property is defined, Vue will set the value as a DOM property instead of an attribute. This should work in most cases, but you can override this behavior by explicitly using `.prop` or `.attr` modifiers. This is sometimes necessary, especially when [working with custom elements](https://vuejs.org/guide/extras/web-components.html#passing-dom-properties).\n\n  When used for component prop binding, the prop must be properly declared in the child component.\n\n  When used without an argument, can be used to bind an object containing attribute name-value pairs.\n\n- **Example**\n\n  ```html\n  <!-- bind an attribute -->\n  <img v-bind:src="imageSrc" />\n\n  <!-- dynamic attribute name -->\n  <button v-bind:[key]="value"></button>\n\n  <!-- shorthand -->\n  <img :src="imageSrc" />\n\n  <!-- same-name shorthand (3.4+), expands to :src="src" -->\n  <img :src />\n\n  <!-- shorthand dynamic attribute name -->\n  <button :[key]="value"></button>\n\n  <!-- with inline string concatenation -->\n  <img :src="\'/path/to/images/\' + fileName" />\n\n  <!-- class binding -->\n  <div :class="{ red: isRed }"></div>\n  <div :class="[classA, classB]"></div>\n  <div :class="[classA, { classB: isB, classC: isC }]"></div>\n\n  <!-- style binding -->\n  <div :style="{ fontSize: size + \'px\' }"></div>\n  <div :style="[styleObjectA, styleObjectB]"></div>\n\n  <!-- binding an object of attributes -->\n  <div v-bind="{ id: someProp, \'other-attr\': otherProp }"></div>\n\n  <!-- prop binding. "prop" must be declared in the child component. -->\n  <MyComponent :prop="someThing" />\n\n  <!-- pass down parent props in common with a child component -->\n  <MyComponent v-bind="$props" />\n\n  <!-- XLink -->\n  <svg><a :xlink:special="foo"></a></svg>\n  ```\n\n  The `.prop` modifier also has a dedicated shorthand, `.`:\n\n  ```html\n  <div :someProperty.prop="someObject"></div>\n\n  <!-- equivalent to -->\n  <div .someProperty="someObject"></div>\n  ```\n\n  The `.camel` modifier allows camelizing a `v-bind` attribute name when using in-DOM templates, e.g. the SVG `viewBox` attribute:\n\n  ```html\n  <svg :view-box.camel="viewBox"></svg>\n  ```\n\n  `.camel` is not needed if you are using string templates, or pre-compiling the template with a build step.\n\n- **See also**\n  - [Class and Style Bindings](https://vuejs.org/guide/essentials/class-and-style.html)\n  - [Components - Prop Passing Details](https://vuejs.org/guide/components/props.html#prop-passing-details)\n',
      },
      references: [
        {
          name: 'en',
          url: 'https://vuejs.org/api/built-in-directives.html#v-bind',
        },
        {
          name: 'zh-cn',
          url: 'https://cn.vuejs.org/api/built-in-directives.html#v-bind',
        },
      ],
    },
    {
      name: 'v-model',
      description: {
        kind: 'markdown',
        value: '\nCreate a two-way binding on a form input element or a component.\n\n- **Expects:** varies based on value of form inputs element or output of components\n\n- **Limited to:**\n\n  - `<input>`\n  - `<select>`\n  - `<textarea>`\n  - components\n\n- **Modifiers**\n\n  - [`.lazy`](https://vuejs.org/guide/essentials/forms.html#lazy) - listen to `change` events instead of `input`\n  - [`.number`](https://vuejs.org/guide/essentials/forms.html#number) - cast valid input string to numbers\n  - [`.trim`](https://vuejs.org/guide/essentials/forms.html#trim) - trim input\n\n- **See also**\n\n  - [Form Input Bindings](https://vuejs.org/guide/essentials/forms.html)\n  - [Component Events - Usage with `v-model`](https://vuejs.org/guide/components/v-model.html)\n',
      },
      references: [
        {
          name: 'en',
          url: 'https://vuejs.org/api/built-in-directives.html#v-model',
        },
        {
          name: 'zh-cn',
          url: 'https://cn.vuejs.org/api/built-in-directives.html#v-model',
        },
      ],
    },
    {
      name: 'v-slot',
      description: {
        kind: 'markdown',
        value: '\nDenote named slots or scoped slots that expect to receive props.\n\n- **Shorthand:** `#`\n\n- **Expects:** JavaScript expression that is valid in a function argument position, including support for destructuring. Optional - only needed if expecting props to be passed to the slot.\n\n- **Argument:** slot name (optional, defaults to `default`)\n\n- **Limited to:**\n\n  - `<template>`\n  - [components](https://vuejs.org/guide/components/slots.html#scoped-slots) (for a lone default slot with props)\n\n- **Example**\n\n  ```html\n  <!-- Named slots -->\n  <BaseLayout>\n    <template v-slot:header>\n      Header content\n    </template>\n\n    <template v-slot:default>\n      Default slot content\n    </template>\n\n    <template v-slot:footer>\n      Footer content\n    </template>\n  </BaseLayout>\n\n  <!-- Named slot that receives props -->\n  <InfiniteScroll>\n    <template v-slot:item="slotProps">\n      <div class="item">\n        {{ slotProps.item.text }}\n      </div>\n    </template>\n  </InfiniteScroll>\n\n  <!-- Default slot that receive props, with destructuring -->\n  <Mouse v-slot="{ x, y }">\n    Mouse position: {{ x }}, {{ y }}\n  </Mouse>\n  ```\n\n- **See also**\n  - [Components - Slots](https://vuejs.org/guide/components/slots.html)\n',
      },
      references: [
        {
          name: 'en',
          url: 'https://vuejs.org/api/built-in-directives.html#v-slot',
        },
        {
          name: 'zh-cn',
          url: 'https://cn.vuejs.org/api/built-in-directives.html#v-slot',
        },
      ],
    },
    {
      name: 'v-pre',
      valueSet: 'v',
      description: {
        kind: 'markdown',
        value: '\nSkip compilation for this element and all its children.\n\n- **Does not expect expression**\n\n- **Details**\n\n  Inside the element with `v-pre`, all Vue template syntax will be preserved and rendered as-is. The most common use case of this is displaying raw mustache tags.\n\n- **Example**\n\n  ```html\n  <span v-pre>{{ this will not be compiled }}</span>\n  ```\n',
      },
      references: [
        {
          name: 'en',
          url: 'https://vuejs.org/api/built-in-directives.html#v-pre',
        },
        {
          name: 'zh-cn',
          url: 'https://cn.vuejs.org/api/built-in-directives.html#v-pre',
        },
      ],
    },
    {
      name: 'v-once',
      valueSet: 'v',
      description: {
        kind: 'markdown',
        value: '\nRender the element and component once only, and skip future updates.\n\n- **Does not expect expression**\n\n- **Details**\n\n  On subsequent re-renders, the element/component and all its children will be treated as static content and skipped. This can be used to optimize update performance.\n\n  ```html\n  <!-- single element -->\n  <span v-once>This will never change: {{msg}}</span>\n  <!-- the element have children -->\n  <div v-once>\n    <h1>Comment</h1>\n    <p>{{msg}}</p>\n  </div>\n  <!-- component -->\n  <MyComponent v-once :comment="msg"></MyComponent>\n  <!-- `v-for` directive -->\n  <ul>\n    <li v-for="i in list" v-once>{{i}}</li>\n  </ul>\n  ```\n\n  Since 3.2, you can also memoize part of the template with invalidation conditions using [`v-memo`](#v-memo).\n\n- **See also**\n  - [Data Binding Syntax - interpolations](https://vuejs.org/guide/essentials/template-syntax.html#text-interpolation)\n  - [v-memo](#v-memo)\n',
      },
      references: [
        {
          name: 'en',
          url: 'https://vuejs.org/api/built-in-directives.html#v-once',
        },
        {
          name: 'zh-cn',
          url: 'https://cn.vuejs.org/api/built-in-directives.html#v-once',
        },
      ],
    },
    {
      name: 'v-memo',
      description: {
        kind: 'markdown',
        value: '\n- Only supported in 3.2+\n\n- **Expects:** `any[]`\n\n- **Details**\n\n  Memoize a sub-tree of the template. Can be used on both elements and components. The directive expects a fixed-length array of dependency values to compare for the memoization. If every value in the array was the same as last render, then updates for the entire sub-tree will be skipped. For example:\n\n  ```html\n  <div v-memo="[valueA, valueB]">\n    ...\n  </div>\n  ```\n\n  When the component re-renders, if both `valueA` and `valueB` remain the same, all updates for this `<div>` and its children will be skipped. In fact, even the Virtual DOM VNode creation will also be skipped since the memoized copy of the sub-tree can be reused.\n\n  It is important to specify the memoization array correctly, otherwise we may skip updates that should indeed be applied. `v-memo` with an empty dependency array (`v-memo="[]"`) would be functionally equivalent to `v-once`.\n\n  **Usage with `v-for`**\n\n  `v-memo` is provided solely for micro optimizations in performance-critical scenarios and should be rarely needed. The most common case where this may prove helpful is when rendering large `v-for` lists (where `length > 1000`):\n\n  ```html\n  <div v-for="item in list" :key="item.id" v-memo="[item.id === selected]">\n    <p>ID: {{ item.id }} - selected: {{ item.id === selected }}</p>\n    <p>...more child nodes</p>\n  </div>\n  ```\n\n  When the component\'s `selected` state changes, a large amount of VNodes will be created even though most of the items remained exactly the same. The `v-memo` usage here is essentially saying "only update this item if it went from non-selected to selected, or the other way around". This allows every unaffected item to reuse its previous VNode and skip diffing entirely. Note we don\'t need to include `item.id` in the memo dependency array here since Vue automatically infers it from the item\'s `:key`.\n\n  :::warning\n  When using `v-memo` with `v-for`, make sure they are used on the same element. **`v-memo` does not work inside `v-for`.**\n  :::\n\n  `v-memo` can also be used on components to manually prevent unwanted updates in certain edge cases where the child component update check has been de-optimized. But again, it is the developer\'s responsibility to specify correct dependency arrays to avoid skipping necessary updates.\n\n- **See also**\n  - [v-once](#v-once)\n',
      },
      references: [
        {
          name: 'en',
          url: 'https://vuejs.org/api/built-in-directives.html#v-memo',
        },
        {
          name: 'zh-cn',
          url: 'https://cn.vuejs.org/api/built-in-directives.html#v-memo',
        },
      ],
    },
    {
      name: 'v-cloak',
      valueSet: 'v',
      description: {
        kind: 'markdown',
        value: '\nUsed to hide un-compiled template until it is ready.\n\n- **Does not expect expression**\n\n- **Details**\n\n  **This directive is only needed in no-build-step setups.**\n\n  When using in-DOM templates, there can be a "flash of un-compiled templates": the user may see raw mustache tags until the mounted component replaces them with rendered content.\n\n  `v-cloak` will remain on the element until the associated component instance is mounted. Combined with CSS rules such as `[v-cloak] { display: none }`, it can be used to hide the raw templates until the component is ready.\n\n- **Example**\n\n  ```css\n  [v-cloak] {\n    display: none;\n  }\n  ```\n\n  ```html\n  <div v-cloak>\n    {{ message }}\n  </div>\n  ```\n\n  The `<div>` will not be visible until the compilation is done.\n',
      },
      references: [
        {
          name: 'en',
          url: 'https://vuejs.org/api/built-in-directives.html#v-cloak',
        },
        {
          name: 'zh-cn',
          url: 'https://cn.vuejs.org/api/built-in-directives.html#v-cloak',
        },
      ],
    },
    {
      name: 'key',
      description: {
        kind: 'markdown',
        value: '\nThe `key` special attribute is primarily used as a hint for Vue\'s virtual DOM algorithm to identify vnodes when diffing the new list of nodes against the old list.\n\n- **Expects:** `number | string | symbol`\n\n- **Details**\n\n  Without keys, Vue uses an algorithm that minimizes element movement and tries to patch/reuse elements of the same type in-place as much as possible. With keys, it will reorder elements based on the order change of keys, and elements with keys that are no longer present will always be removed / destroyed.\n\n  Children of the same common parent must have **unique keys**. Duplicate keys will cause render errors.\n\n  The most common use case is combined with `v-for`:\n\n  ```html\n  <ul>\n    <li v-for="item in items" :key="item.id">...</li>\n  </ul>\n  ```\n\n  It can also be used to force replacement of an element/component instead of reusing it. This can be useful when you want to:\n\n  - Properly trigger lifecycle hooks of a component\n  - Trigger transitions\n\n  For example:\n\n  ```html\n  <transition>\n    <span :key="text">{{ text }}</span>\n  </transition>\n  ```\n\n  When `text` changes, the `<span>` will always be replaced instead of patched, so a transition will be triggered.\n\n- **See also** [Guide - List Rendering - Maintaining State with `key`](https://vuejs.org/guide/essentials/list.html#maintaining-state-with-key)\n',
      },
      references: [
        {
          name: 'en',
          url: 'https://vuejs.org/api/built-in-special-attributes.html#key',
        },
        {
          name: 'zh-cn',
          url: 'https://cn.vuejs.org/api/built-in-special-attributes.html#key',
        },
      ],
    },
    {
      name: 'ref',
      description: {
        kind: 'markdown',
        value: '\nDenotes a [template ref](https://vuejs.org/guide/essentials/template-refs.html).\n\n- **Expects:** `string | Function`\n\n- **Details**\n\n  `ref` is used to register a reference to an element or a child component.\n\n  In Options API, the reference will be registered under the component\'s `this.$refs` object:\n\n  ```html\n  <!-- stored as this.$refs.p -->\n  <p ref="p">hello</p>\n  ```\n\n  In Composition API, the reference will be stored in a ref with matching name:\n\n  ```vue\n  <script setup>\n  import { ref } from \'vue\'\n\n  const p = ref()\n  </script>\n\n  <template>\n    <p ref="p">hello</p>\n  </template>\n  ```\n\n  If used on a plain DOM element, the reference will be that element; if used on a child component, the reference will be the child component instance.\n\n  Alternatively `ref` can accept a function value which provides full control over where to store the reference:\n\n  ```html\n  <ChildComponent :ref="(el) => child = el" />\n  ```\n\n  An important note about the ref registration timing: because the refs themselves are created as a result of the render function, you must wait until the component is mounted before accessing them.\n\n  `this.$refs` is also non-reactive, therefore you should not attempt to use it in templates for data-binding.\n\n- **See also**\n  - [Guide - Template Refs](https://vuejs.org/guide/essentials/template-refs.html)\n  - [Guide - Typing Template Refs](https://vuejs.org/guide/typescript/composition-api.html#typing-template-refs) <sup class="vt-badge ts" />\n  - [Guide - Typing Component Template Refs](https://vuejs.org/guide/typescript/composition-api.html#typing-component-template-refs) <sup class="vt-badge ts" />\n',
      },
      references: [
        {
          name: 'en',
          url: 'https://vuejs.org/api/built-in-special-attributes.html#ref',
        },
        {
          name: 'zh-cn',
          url: 'https://cn.vuejs.org/api/built-in-special-attributes.html#ref',
        },
      ],
    },
    {
      name: 'is',
      description: {
        kind: 'markdown',
        value: '\nUsed for binding [dynamic components](https://vuejs.org/guide/essentials/component-basics.html#dynamic-components).\n\n- **Expects:** `string | Component`\n\n- **Usage on native elements**\n \n  - Only supported in 3.1+\n\n  When the `is` attribute is used on a native HTML element, it will be interpreted as a [Customized built-in element](https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements-customized-builtin-example), which is a native web platform feature.\n\n  There is, however, a use case where you may need Vue to replace a native element with a Vue component, as explained in [in-DOM Template Parsing Caveats](https://vuejs.org/guide/essentials/component-basics.html#in-dom-template-parsing-caveats). You can prefix the value of the `is` attribute with `vue:` so that Vue will render the element as a Vue component instead:\n\n  ```html\n  <table>\n    <tr is="vue:my-row-component"></tr>\n  </table>\n  ```\n\n- **See also**\n\n  - [Built-in Special Element - `<component>`](https://vuejs.org/api/built-in-special-elements.html#component)\n  - [Dynamic Components](https://vuejs.org/guide/essentials/component-basics.html#dynamic-components)\n',
      },
      references: [
        {
          name: 'en',
          url: 'https://vuejs.org/api/built-in-special-attributes.html#is',
        },
        {
          name: 'zh-cn',
          url: 'https://cn.vuejs.org/api/built-in-special-attributes.html#is',
        },
      ],
    },
  ],
}
