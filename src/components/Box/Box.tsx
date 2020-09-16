import {
  createElement,
  cloneElement,
  FC,
  ReactNode,
  ReactElement,
} from 'react';
import classNames from 'classnames';
import {
  PALMETTO_FONT_SIZES,
  PALMETTO_FONT_COLORS,
  PALMETTO_COLORS,
  PALMETTO_SPACING,
} from '../../lib/tokens';
// import getElementType from '../../lib/getElementType';
import getDimensionCss from '../../lib/getDimensionCss';
import getSpacingCss from '../../lib/getSpacingCss';
import getElementType from '../../lib/getElementType';
// import BorderType from '../../types';

interface BoxProps {
  /**
   * The element type to be rendered.
   */
  as: string;
  // /**
  //  * How to align the contents along the cross axis.
  //  */
  // align: PropTypes.oneOf(['start', 'center', 'end', 'baseline', 'stretch']),
  // /**
  //  * How to align the contents when there is extra space in the cross axis
  //  */
  // alignContent: PropTypes.oneOf([
  //   'start',
  //   'center',
  //   'end',
  //   'between',
  //   'around',
  //   'stretch',
  // ]),
  // /**
  //  * How to align along the cross axis when contained in a Box or along the column axis when contained in a Grid.
  //  */
  // alignSelf: PropTypes.oneOf(['start', 'center', 'end', 'stretch']),
  /**
   * The DOM tag or react component to use for the element.
   */
  // as?: elementType;
  /**
   * Any valid [brand color token](/?path=/docs/design-tokens-colors--brand), or a `url()` for an image
   */
  background?: PALMETTO_COLORS;
  // /**
  //  * The default size of an element before the remaining space is distributed
  //  */
  // basis: PropTypes.oneOfType([
  //   PropTypes.oneOf(['auto', 'full', '1/2', '1/4', '3/4', '1/3', '2/3']),
  //   PropTypes.string,
  // ]),
  /**
   * Any valid [brand color token](/?path=/docs/design-tokens-colors--brand) for the border color
   */
  border?: PALMETTO_COLORS;
  /**
   * Additional class names to add
   */
  className?: string;
  /**
   * The amount of spacing between child elements.
   */
  childGap?: PALMETTO_SPACING;
  /**
   * The box's contents
   */
  children?: ReactNode;
  /**
   * A color token identifier to use for the text color.
   */
  color?: PALMETTO_FONT_COLORS;
  /**
   * Sets how flex items are placed inside the Box, defining the main axis and the direction
   */
  direction?: 'column' | 'column-reverse' | 'row' | 'row-reverse';
  /**
   * Display property. Only select values supported.
   */
  display?: 'flex' | 'inline-flex' | 'block' | 'inline-block' | 'inline' | 'inherit';
  // /**
  //  * Make the Box a flex container, and its children a flex item.
  //  * Can be used as shorthand for the flexbox css properties `flex-grow` and `flex-shrink`
  //  */
  // flex: PropTypes.oneOf([
  //   'grow',
  //   'shrink',
  //   true,
  //   false,
  //   PropTypes.exact({
  //     grow: PropTypes.number,
  //     shrink: PropTypes.number,
  //   }),
  // ]),
  /**
   * The [font size token](/?path=/docs/design-tokens-font-size--page) identifier for the Box text
   */
  fontSize?: PALMETTO_FONT_SIZES;
  /**
   * The height of the element. Can be given a standard css value (px, rem, em, %),
   * or a [height token](/?path=/docs/design-tokens-height--page)
   */
  height?: string;
  // /**
  //  * How space between and around content items is distributed along the main-axis a flex Box
  //  */
  // justify: PropTypes.oneOf([
  //   'around',
  //   'between',
  //   'center',
  //   'end',
  //   'evenly',
  //   'start',
  //   'stretch',
  // ]),
  /**
   * Amount of space around the element. It models itself after the css shorthand property,
   * where you can set the margin area on all four sides of an element.It is shorthand for top, right, bottom, left.
   */
  margin?: PALMETTO_SPACING;
  /**
   * The overflow property is specified as one or two keywords.
   * If two keywords are specified, the first applies to overflow-x and the second to overflow-y.
   * Otherwise, both overflow-x and overflow-y are set to the same value.
   */
  overflow?:
    'visible'
    | 'hidden'
    | 'clip'
    | 'scroll'
    | 'auto'
    | 'inherit'
    | 'initial'
    | 'unset';
  /**
   * Amount of space within the element around the Box contents. It models itself after the css shorthand property,
   * where you can set the margin area on all four sides of an element. It is shorthand for top, right, bottom, left.
   */
  padding?: PALMETTO_SPACING;
  /**
   * Set the radius of all corners
   */
  radius?: string; // need to define based on design tokens
  // wrap: PropTypes.oneOf([true, false, 'reverse']),
  /**
   * The width of the element. Can be given a standard css value (px, rem, em, %),
   * or a [width token](/?path=/docs/design-tokens-width--page)
   */
  width?: string;
}

/**
 * A `<Box>` is a layout component to build UIs with consistent padding and spacing between
 * elements.
 */
const Box: FC<BoxProps> = ({
  as = 'div',
  // align,
  // alignContent,
  // alignSelf,
  background = undefined,
  // basis,
  border = undefined,
  children,
  childGap = undefined,
  className = '',
  color = undefined,
  display = 'flex',
  direction = 'column',
  // flex,
  fontSize = 'inherit',
  height = undefined,
  // justify,
  margin,
  overflow = 'auto',
  padding = undefined,
  radius = undefined,
  // wrap,
  width = undefined,
  ...rest
}) => {
  const marginCss = getSpacingCss('m', margin);
  const paddingCss = getSpacingCss('p', padding);
  const heightCss = getDimensionCss('h', height);
  const widthCss = getDimensionCss('w', width);

  const classes = classNames(
    className,
    display,
    marginCss.classes,
    paddingCss.classes,
    heightCss.classes,
    widthCss.classes,
    {
      [`flex-direction-${direction}`]: display.includes('flex') && direction,
      [`background-color-${background}`]: background,
      [`border-color-${border}`]: border,
      [`font-color-${color}`]: color,
      [`font-size-${fontSize}`]: fontSize,
      [`border-radius-${radius}`]: radius,
      [`overflow-${overflow}`]: overflow,
    },
  );

  const boxStyles = {
    ...marginCss.styles,
    ...heightCss.styles,
    ...widthCss.styles,
    ...border && { borderWidth: '1px', borderStyle: 'solid' },
  };

  const childGapClass = classNames({
    [`m-bottom-${childGap}`]: childGap && direction.includes('column'),
    [`m-right-${childGap}`]: childGap && direction.includes('row'),
  });

  let decoratedChildren = children;
  if (childGapClass && Array.isArray(children)) {
    decoratedChildren = children
      .map((child, i) => {
        if (i < children.length - 1) {
          return cloneElement(
            (child as ReactElement),
            { className: classNames((child as ReactElement).props.className, childGapClass) },
          );
        }
        return child;
      });
  }

  const element = getElementType(Box, { as });

  return createElement(
    element,
    { className: classes, style: boxStyles, ...rest },
    decoratedChildren,
  );
};

export default Box;
