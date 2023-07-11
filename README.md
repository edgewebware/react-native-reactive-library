# React Native Reactive Library

<!-- ## How is this better than other packages? -->

<!-- To begin with, this is not just a grid, or responsive, it includes custom components -->
<!-- [react-native-responsive-ui](https://github.com/wcandillon/react-native-responsive-ui) -->
## Table of Contents
* [Configuration](#user-content-general-usage)
	* [Installation](#user-content-installation)
	* [Setup](#user-content-setup)
* [Settings](#user-content-settings)
	* [Breakpoints](#user-content-breakpoints)
	* [The Theme](#user-content-the-theme)
		* [*Colors*](#user-content-colors)
		* [*Defaults*](#user-content-defaults)
		* [*Formats*](#user-content-formats)
	* [The Stylesheet](#user-content-the-stylesheet)
	* [The Grid](#user-content-the-grid)
* [Components](#user-content-components)
	* [Container](#user-content-container)
	* [GridX](#user-content-gridx)
	* [GridY](#user-content-gridy)
	* [Cell](#user-content-cell)
	* [Text](#user-content-text)
	* [BlockText](#user-content-blocktext)
	* [Link](#user-content-link)
	* [Button](#user-content-button)
	* [Accordion](#user-content-accordion)
	* [AccordionGroup](#user-content-accordiongroup)

## Configuration
### Installation
`npm install --save react-native-reactive-library`
`yarn add react-native-reactive-library`

### Setup

You will find a new file, settings.js in your project root.  This is where all Reactive settings are stored, which are entirely customizable.  You can move this to any location in your project.  Be sure to import the file into your project in your primary controller.  It **must** be imported before React Native Reactive Library can be imported.  

```javascript
// import settings.js before react-native-reactive-library
import './settings'
// react-native-reactive-library can now be imported
import Reactive from 'react-native-reactive-library'
```

## Settings
### Setting Settings
You can configure your settings by passing settings through the following functions.
```javascript
set.breakpoints(breakpoints)
set.defaults(defaults)
set.formats(formats)
set.colors(colors)
set.styles(styles)
```
Ensure that you set breakpoints before any other settings, as they rely on the breakpoints.
### Breakpoints
Breakpoints allow you to customize styles by the size of the device. If multiple breakpoints apply, the first in the list will take precedence over the later. Currently the only condition available for breakpoints is the device width, but more are expected to be added shortly (i.e. height, ratio, etc). They are easily customizable.
#### Basic

```javascript
const breakpoints = [
  {
		name: 'small',
		minWidth: 320
	},
	{
		name: 'medium',
		minWidth: 720
	},
	{
		name: 'large',
		minWidth: 1024
	}
]
```

| Property          | Type               | Description                                  | Accepted Arguments     |
|-------------------|--------------------|----------------------------------------------|------------------------|
| name              | *string*           | Name of breakpoint to for reference          | any *string*           |
| aspectRatio       | *string*           | Device aspect ratio required for a match     | 'integer:integer' for absolute aspectRatio, '[integer:integer]' for reversible aspect ratio |
| orientation       | *string*           | Device orientation required for a match      | landscape, portrait    |
| minWidth          | *float*            | Minimum allowed device width for a match     | *float* > 0            |
| maxWidth          | *float*            | Maximum allowed device width for a match     | *float* > 0            |
| minHeight         | *float*            | Minimum allowed device height for a match    | *float* > 0            |
| maxHeight         | *float*            | Maximum allowed device height for a match    | *float* > 0            |

#### Advanced

```javascript
const breakpoints = [
	{
		name: 'smallPortrait',
		minWidth: 320,
		maxWidth: 720,
		landscape: 'portrait'
	},
	{
		name: 'iPadPro',
		minWidth: 834,
		minHeight: 834,
		aspectRatio: '[3:4]'
	},
	{
		name: 'iPhoneXLandscape',
		minHeight: 834,
		maxHeight: 834,
		orientation: 'portrait'
	}
]
```


### The Theme
#### Colors
You can define any number of theme colors to be used throughout the project.  They can be used either in component props, or imported into project files and used in a stylesheet or inline styles

##### Definition

```javascript
const colors = {
  primary: '#00246D',
  secondary: '#00A651',
  warning: 'orange',
  info: '#2864DC',
  success: '#096737',
  black: 'black',
  lightGray: '#CCC8C7',
  gray: '#9f9f9f',
  darkGray: '#4D4D4D',
  white: '#ffffff',
}
```

##### Usage

```jsx
import Reactive from 'react-native-reactive-library'
const {colors} = Reactive
<Text style={{color: colors.primary}}></Text>

```

#### Defaults
The defaults allow you to define global defaults to be used throughout components including margin, rounding and font families.  Stylesheet rules apply to this as well

```javascript
const defaults = {
	gridSize: 12,
	margin: {
		small: 15,
		medium: 18,
		large: 21
	},
	rounding: {
		small: 10,
		medium: 12,
		large: 14
	},
	fontFamily: {
		body: 'Open Sans',
		header: 'Open Sans'
	}
}

defaults.padding = defaults.margin
```

#### Formats
You can define formats to simplify components, and create custom components.  Props and styles put under defaults will be used by the base component, and inherited by all other formats
```javascript
let formats = {
	// component name (in camelCase)
	button: {
		defaults: {
			width: 'full',
			backgroundColor: 'white',
			fontFamily: 'body',
			color: 'black',
			borderColor: 'darkGray',
			style: {
				borderBottomWidth: 4
			}
		},
		primary: {
			color: 'white',
			backgroundColor: 'primary'
		}
	}
}
```
You can use formats in two ways.
##### Format Property
```jsx
import {Button} from 'react-native-reactive-library'
...
render () {
	<Button title="Primary Button" format="primary"/>
}
...
```
##### Component
```jsx
import Reactive from 'react-native-reactive-library'
const {Primary: PrimaryBtn} = Reactive.components.Button
...
render () {
	<PrimaryBtn title="Primary Button"/>
}
...
```

#### Styles
The styles predefined in the `settings.js` file should not be deleted.  They can be altered, but adding new "styles" will have no effect.

### The Stylesheet
You can create your own custom stylesheets with responsive styles using `Reactive.StyleSheet.create`.

#### Option 1 - Breakpoints
Styles can be altered based on current breakpoint.

```javascript
const style = {
	className: {
		// breakpoints
		small: {
			height: 100,
			width: 100,
			backgroundColor: 'red'
		},
		medium: {
			height: 120,
			width: 160,
			backgroundColor: 'blue'
		},
		large: {
			height: 150,
			width: 200,
		}
	}
}

const styleSheet = Reactive.StyleSheet.create(style)
```
#### Option 2 - Scaling
You can also scale numerical attributes using the `scalable` attribute.

| Property   | Type     | Default  | Description |
|------------|----------|----------|-------------|
|  include   | *array*  | null     | Array of properties to be scaled, invalid properties will be ignored.  If null, all valid props are scaled  |
|  exclude   | *array*  | null     | Array of properties to **NOT** be scaled.  If null, no props will be ignored    |
| multiplier | *float*  | 1        | Amount to multiply the scale |
| condition  | *string* | 'width'  | Unit that the scale is based off |

For example, if the condition is 'width', and the base width is 320, the current width is 960, with multiplier of 0.5, it will scale to *(960/320 - 1) x 0.5 + 1 = 2 x 0.5 + 1 = **2***

```javascript
const style = {
	className: {
		width: 50,
		height: 100,
		scalable: {
			include: ['width'],
			multiplier: 0.5,
			condition: 'width'
		}
	},
	otherClassName: {
		width: 50,
		height: 100,
		scalable: true
	}
}

const styleSheet = Reactive.StyleSheet.create(style)
```

#### Combination
You can also combine breakpoints and scaling.  In the following example, the scaling will begin when the screen breakpoint is medium or greater.

```javascript
const style = {
	otherClassName: {
		small: {
			width: 50
		},
		medium: {
			width: 50,
			scalable: true
		}
	}
}

const styleSheet = Reactive.StyleSheet.create(style)
```

### The Grid
The grid utilizes the breakpoints and grid size.  The following working example assumes `defaults.gridSize = 12`

```jsx
import React, { Component } from 'react'
import { Text } from 'react-native'

import './settings';

import Reactive, { GridY, GridX, Cell } from 'react-native-reactive-library'

export default class App extends Component {
  render() {
    return (
      <Wrapper>
        <GridY style={{height: '100%', width: '100%'}}>
          <Cell size="auto" style={{backgroundColor:'orange'}}>
            <Text>This will stretch to fill the remaining height of the parent</Text>
            <GridX padding="all">
              <Cell size={{small: 6, medium: 3}} style={{backgroundColor:'pink'}}>
                <Text>
                  This fills 1/2th of the width on a small screen
                  and fills 1/4th of the width on a medium screen
                </Text>
              </Cell>
              <Cell size={{small: 6, medium: 3}} style={{backgroundColor:'purple'}}>
                <Text>
                  This fills 1/2th of the width on a small screen
                  and fills 1/4th of the width on a medium screen
                </Text>
              </Cell>
              <Cell size="auto" style={{backgroundColor:'red'}}>
                <Text>This fills the remainder of the screens width</Text>
              </Cell>
            </GridX>
          </Cell>
          <Cell size="shrink" style={{backgroundColor:'yellow'}}>
            <Text>This Cell is shrunk to fit the content</Text>
          </Cell>
        </GridY>
      </Wrapper>
    )
  }
}
```

## Components
All accepted props can utilize the breakpoint structure from stylesheets

### Container
#### Accepted props

| Property   | Type           | Description                   | Accepted Arguments     |
|------------|----------------|-------------------------------|------------------------|
| hAlign     | *string*       | Horizontal content alignment  | left, right, center, baseline, stretch |
| vAlign     | *string*       | Vertical content alignment    | top, bottom, middle, justify, distribute |
| margin     | *string*       | Container margin              | x, y, left, top, right, bottom, all |
| padding    | *string*       | Container padding             | x, y, left, top, right, bottom, all |
| size       | *string*       | Container width               | User defined size |
| fitParent  | *boolean*      | Have container fill parent    | true/false |
| inherit    | *boolean*      | Ignore default format         | true/false |
| format     | *string*       | Component formats             | User defined format |
| style      | *object*       | Component styles              | Generic text component styles |

#### Usage
```jsx
<Container padding={{small: "all", large: "x"}} fitParent>
	...
</Container>
```

### GridX
#### Accepted props

| Property   | Type           | Description                   | Accepted Arguments     |
|------------|----------------|-------------------------------|------------------------|
| hAlign     | *string*       | Horizontal cell alignment     | left, right, center, baseline, stretch |
| vAlign     | *string*       | Vertical cell alignment       | top, bottom, middle, justify, distribute |
| margin     | *string*       | Child cell margin             | x, y, left, top, right, bottom, all |
| padding    | *string*       | Child cell padding            | x, y, left, top, right, bottom, all |
| inherit    | *boolean*      | Ignore default format         | true/false |
| format     | *string*       | Component formats             | User defined format |
| style      | *object*       | Component styles              | Generic text component styles |

#### Usage
```jsx
<GridX hAlign="center" ...>
	<Cell size="6">Content</Cell>
</GridX>
```

### GridY
#### Accepted props

| Property   | Type           | Description                   | Accepted Arguments     |
|------------|----------------|-------------------------------|------------------------|
| hAlign     | *string*       | Horizontal cell alignment     | left, right, center, baseline, stretch |
| vAlign     | *string*       | Vertical cell alignment       | top, bottom, middle, justify, distribute |
| margin     | *string*       | Child cell margin             | x, y, left, top, right, bottom, all |
| padding    | *string*       | Child cell padding            | x, y, left, top, right, bottom, all |
| inherit    | *boolean*      | Ignore default format         | true/false |
| format     | *string*       | Component formats             | User defined format |
| style      | *object*       | Component styles              | Generic text component styles |

#### Usage
```jsx
<GridY hAlign="center" ...>
	<Cell size="6">Content</Cell>
</GridY>
```

### Cell
*Must be a child of* [`GridX`](#gridx-component) *or* [`GridY`](#gridy-component) *component*
#### Accepted props

| Property   | Type             | Description                           | Accepted Arguments     |
|------------|------------------|---------------------------------------|------------------------|
| align      | *string*         | Cell alignment (Overrides grid)       | left, right, center, stretch, baseline, auto |
| margin     | *string*         | Cell margin (Overrides grid)          | x, y, left, top, right, bottom, all |
| padding    | *string*         | Cell padding (Overrides grid)         | x, y, left, top, right, bottom, all |
| size       | *string/integer* | Cell width or height relative to grid | *integer* <= grid size or shrink, auto |
| inherit    | *boolean*        | Ignore default format                 | true/false |
| format     | *string*         | Component formats                     | User defined format |
| style      | *object*         | Component styles                      | Generic text component styles |

#### Usage
```jsx
<GridX hAlign="center" ...>
	<Cell size="shrink">Content</Cell>
	<Cell size="6">Content</Cell>
	<Cell size="auto">Content</Cell>
</GridX>
```

### Text
#### Accepted props

| Property   | Type           | Description               | Accepted Arguments     |
|------------|----------------|---------------------------|------------------------|
| color      | *string*       | Text color                | *string* - Valid color |
| weight     | *string*       | Font weight               | thin, extralight, light, regular, semiBold, bold, extraBold, black|
| align      | *string*       | Text align                | left, right, center, justify |
| fontFamily | *string*       | Text font family          | *string* - Valid font family |
| size       | *string*       | Font size                 | User defined size |
| spacing    | *string*       | Margin between components | large, medium, small, none |
| lineHeight | *string/float* | Text line height          | *float* or *float* followed by 'em' e.g. '1.4em'
| inherit    | *boolean*      | Ignore default format     | true/false |
| format     | *string*       | Component formats         | user defined formats |
| style      | *object*       | Component styles          | generic text component styles |

#### Usage
```jsx
<Text lineHeight="1.4em" weight="bold" spacing={{small: 'none', medium: 'small'}} ...>
	This is miscellaneous text
</Text>
```

### BlockText
#### Accepted props

| Property          | Type               | Description               | Accepted Arguments     |
|-------------------|--------------------|---------------------------|------------------------|
| color             | *string*           | Text color                | *string* - Valid color |
| weight            | *string*           | Font weight               | thin, extralight, light, regular, semiBold, bold, extraBold, black|
| align             | *string*           | Text align                | left, right, center, justify |
| fontFamily        | *string*           | Text font family          | *string* - Valid font family |
| size              | *string*           | Block and Font size       | User defined size |
| spacing           | *string*           | Margin between components | large, medium, small, none |
| lineHeight        | *string/float*     | Text line height          | *float* or *float* followed by 'em' e.g. '1.4em'
| style             | *object*           | Component styles          | generic text component styles |
| width             | *string*           | Block width               | width, auto|
| padding    			  | *string*           | Block padding             | x, y, left, right, top, bottom, all |
| borderColor 		  | *string*           | Block border color        | *string* - Valid color |
| borderWidth 		  | *float*            | Block border width        | *float* |
| backgroundColor   | *string*           | Block background color    | *string* - Valid color |
| rounding   			  | *string*           | Button rounding           | large, medium, small, none |
| inherit           | *boolean*          | Ignore default format     | true/false |
| format            | *string*           | Component formats         | user defined formats |

#### Usage
```jsx
<BlockText backgroundColor="secondary" lineHeight="1.4em" weight="bold" spacing={{small: 'none', medium: 'small'}} ...>
	This is miscellaneous text
</BlockText>
```

### Link
Link inherits default text format
#### Accepted props

| Property          | Type               | Description               | Accepted Arguments     |
|-------------------|--------------------|---------------------------|------------------------|
| url               | *string*           | Link URL                  | *string* - A valid url |
| color             | *string*           | Text color                | *string* - Valid color |
| weight            | *string*           | Font weight               | thin, extraLight, light, regular, semiBold, bold, extraBold, black|
| align             | *string*           | Text align                | left, right, center, justify |
| fontFamily        | *string*           | Text font family          | *string* - Valid font family |
| size              | *string*           | Font size                 | User defined size |
| spacing           | *string*           | Margin between components | large, medium, small, none |
| lineHeight        | *string/float*     | Text line height          | *float* or *float* followed by 'em' e.g. '1.4em' |
| inherit           | *boolean*          | Ignore default format     | true/false |
| format            | *string*           | Component formats         | User defined format |
| style             | *object*           | Component styles          | Generic text component styles |

#### Usage
```jsx
<Link url="mailto:johnsmith@example.com" lineHeight="1.4em" color="secondary" ...>
	This is miscellaneous text
</Link>
```

### Button
#### Accepted props

| Property          | Type               | Description               | Accepted Arguments     |
|-------------------|--------------------|---------------------------|------------------------|
| title     			  | *string/component* | Button title              | Any *string* or React Native Component |
| color             | *string*           | Text color                | *string* - Valid color |
| weight            | *string*           | Font weight               | thin, extralight, light, regular, semiBold, bold, extraBold, black|
| align             | *string*           | Text align                | left, right, center, justify |
| fontFamily        | *string*           | Text font family          | *string* - Valid font family |
| backgroundColor   | *string*           | Button background color   | *string* - Valid color |
| width             | *string*           | Button width              | width, auto|
| padding    			  | *string*           | Button padding            | x, y, left, right, top, bottom, all |
| rounding   			  | *string*           | Button rounding           | large, medium, small, none |
| size       			  | *string*           | Button and font size      | User defined size |
| spacing    			  | *string*           | Margin between components | large, medium, small, none |
| borderColor 		  | *string*           | Button border color       | *string* - Valid color |
| borderWidth 		  | *float*            | Button border width       | *float* |
| inherit    			  | *boolean*          | Ignore default format     | true/false |
| format     			  | *string*           | Button formats            | user defined formats |
| style     			  | *object*           | Button styles             | generic flex component styles |

#### Usage
```jsx
<Button
	title={<Text>This is miscellaneous text</Text>}
	format="primary" size="large" spacing={{small: 'none', medium: 'small'}} .../>
```

### Accordion
NOTE: Accordion is still in BETA

*Must be a child of* [`AccordionGroup`](#accordion-group-component) *component*
#### Accepted props

| Property          | Type               | Description                | Accepted Arguments     |
|-------------------|--------------------|----------------------------|------------------------|
| label     			  | *string/component* | Accordion label            | Any *string* or React Native Component |
| icon       			  | *string/component* | Rotating Accordion icon    | Any *string* or React Native Component |
| color             | *string*           | Text color                 | *string* - Valid color |
| weight            | *string*           | Font weight                | thin, extralight, light, regular, semiBold, bold, extraBold, black|
| align             | *string*           | Text align                 | left, right, center, justify |
| fontFamily        | *string*           | Text font family           | *string* - Valid font family |
| lineHeight        | *string/float*     | Text line height           | *float* or *float* followed by 'em' e.g. '1.4em' |
| backgroundColor   | *string*           | Accordion background color | *string* - Valid color |
| width             | *string*           | Accordion width            | width, auto|
| padding    			  | *string*           | Accordion padding          | x, y, left, right, top, bottom, all |
| rounding   			  | *string*           | Accordion rounding         | large, medium, small, none |
| size       			  | *string*           | Accordion and font size    | User defined size |
| spacing    			  | *string*           | Margin between components  | large, medium, small, none |
| borderColor 		  | *string*           | Accordion border color     | *string* - Valid color |
| borderWidth 		  | *float*            | Accordion border width     | *float* |
| inherit    			  | *boolean*          | Ignore default format      | true/false |
| format     			  | *string*           | Accordion formats          | user defined formats |
| style     			  | *object*           | Accordion styles           | generic flex component styles |

#### Usage
```jsx
<AccordionGroup>
	<Accordion title="An accordion" icon="^" format="primary"/>
</AccordionGroup>
```

### AccordionGroup
*The following props are passed to child accordions: `format, color, weight, align, fontFamily, lineHeight, backgroundColor, width, padding, spacing, rounding, size, borderColor, borderWidth`*
#### Accepted props

| Property          | Type               | Description                                  | Accepted Arguments     |
|-------------------|--------------------|----------------------------------------------|------------------------|
| allowMultiExpand  | *boolean*          | Allows multiple accordions to expand at once | true/false |
| allowAllClosed    | *boolean*          | Allows all accordions to be closed           | true/false |

#### Usage
```jsx
<AccordionGroup allowAllClosed format="primary">
	<Accordion title="An accordion" icon=">" />
	<Accordion title="Another accordion" icon=">" />
	...
</AccordionGroup>
```

### MORE COMPONENT DOCS TO COME!
* List/ListItem

## Known Issues
iOS's split view does not currently return correct dimensions, it returns the entire width of the device regardless of the size of the splitview (see [https://github.com/facebook/react-native/issues/16152](https://github.com/facebook/react-native/issues/16152)).  This can lead to component dimensions being out of whack when in this mode.
