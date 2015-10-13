# AppBar

An `<x-appbar>` is a simple component emulating the standard layout of a header seen at the top of a mobile application.

You can use any elements in place of the ```<button>``` tags in the example below. A heading `<h1>` to `<h6>` element is required, and will be created automatically if not provided.

## Usage

```html
<x-appbar subheading="(3)">
  <button>=</button>
  <h2>Email</h2>
  <button>+</button>
  <button>?</button>
</x-appbar>
```

```javascript
var appbar = document.querySelector('x-appbar');
// Set the header message.
appbar.heading = "Messages";

// Set the subheading with the unread message count.
appbar.subheading = "(3)";
```

## Attributes

### `heading`

Edits the large header text.

### `subheading`

Edits the small optional subheader text.

## Getters

### `heading`

Gets the large header text.

### `subheading`

Gets the small optional subheader text.

## Setters

### `heading`

Sets the large header text.

### `subheading`

Sets the small optional subheader text

