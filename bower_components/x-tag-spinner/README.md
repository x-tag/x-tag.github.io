
##Install

Libraries
- Node / NPM
- Bower (Package Manager)
-- `npm install bower -g`

Inside your project run:
`bower install x-tag-spinner`

##Syntax

The following markup will produce a loading spinner with optional label text

```html
<x-spinner label="Loading"></x-spinner>
```

##Usage

Methods:
- `spin` - starts spinning the element
- `stop` - stops spinning the element
- `toggle` - toggles between spinning and stopped states

Attributes:
- `duration` - Time in seconds it should take for spinner to complete one rotation.
- `label` - Text to display within the spinner.
- `reverse` - Spinner rotation defaults to clockwise. When present, spinner will rotate counterclockwise.
- `src` - The URL of an image to use in place of the CSS spinner effect.


