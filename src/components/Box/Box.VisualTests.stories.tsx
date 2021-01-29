/* eslint-disable react/no-array-index-key */
/* eslint-disable no-else-return */
import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import Box, { BoxProps } from './Box';
import {
  FONT_SIZE_OPTIONS,
  FONT_COLOR_OPTIONS,
  BRAND_COLOR_NAMES,
  SPACING_OPTIONS,
} from '../../lib/tokens';
import {
  BoxShadowSize,
  BorderRadiusSize,
  BrandColor,
  FontSize,
  FontColor,
  ResponsiveProp,
} from '../../types';
import { RESPONSIVE_STORY } from '../../../.storybook/constants';
import useBreakpoint from '../../hooks/useBreakpoint';

export default {
  title: 'Components/Box/Visual Regression Tests',
  component: Box,
} as Meta;

export const AllBackgroundColors: React.FunctionComponent<BoxProps> = () => (
  <Box flex="auto" direction="row" fontSize="sm">
    {BRAND_COLOR_NAMES.map((color, index) => {
      if (color.includes('inherit')) return null;
      else if (color === 'dark' || color === 'light' || color === 'black' || color === 'white') {
        return (
          <Box flex="auto" padding="xs" background={color} key={`${color}-${index}`}>
            {`${color}`}
          </Box>
        );
      } else {
        return (
          <Box flex="auto" key={`${color}-${index}`}>
            <Box flex="auto" padding="xs" background={`${color}-50` as BrandColor}>
              {`${color}-50`}
            </Box>
            <Box flex="auto" padding="xs" background={`${color}-100` as BrandColor}>
              {`${color}-100`}
            </Box>
            <Box flex="auto" padding="xs" background={`${color}-200` as BrandColor}>
              {`${color}-200`}
            </Box>
            <Box flex="auto" padding="xs" background={`${color}-300` as BrandColor}>
              {`${color}-300`}
            </Box>
            <Box flex="auto" padding="xs" background={`${color}-400` as BrandColor}>
              {`${color}-400`}
            </Box>
            <Box flex="auto" padding="xs" background={`${color}-500` as BrandColor}>
              {`${color}-500`}
            </Box>
            <Box flex="auto" padding="xs" background={`${color}-600` as BrandColor}>
              {`${color}-600`}
            </Box>
            <Box flex="auto" padding="xs" background={`${color}-700` as BrandColor}>
              {`${color}-700`}
            </Box>
            <Box flex="auto" padding="xs" background={`${color}-800` as BrandColor}>
              {`${color}-800`}
            </Box>
            <Box flex="auto" padding="xs" background={`${color}-900` as BrandColor}>
              {`${color}-900`}
            </Box>
          </Box>
        );
      }
    })}
  </Box>
);

export const AllBorderColors: React.FunctionComponent<BoxProps> = () => (
  <Box flex="auto" direction="row" fontSize="sm">
    {BRAND_COLOR_NAMES.map((color, index) => {
      if (color.includes('inherit')) return null;
      else if (color === 'dark' || color === 'light' || color === 'black' || color === 'white') {
        return (
          <Box borderColor={color} borderWidth="sm" padding="xs" key={`${color}-${index}`}>
            {`${color}`}
          </Box>
        );
      } else {
        return (
          <Box flex="auto" key={`${color}-${index}`}>
            <Box
              flex="auto"
              borderColor={`${color}-50` as BrandColor}
              borderWidth="sm"
              padding="xs"
            >
              {`${color}-50`}
            </Box>
            <Box
              flex="auto"
              borderColor={`${color}-100` as BrandColor}
              borderWidth="sm"
              padding="xs"
            >
              {`${color}-100`}
            </Box>
            <Box
              flex="auto"
              borderColor={`${color}-200` as BrandColor}
              borderWidth="sm"
              padding="xs"
            >
              {`${color}-200`}
            </Box>
            <Box
              flex="auto"
              borderColor={`${color}-300` as BrandColor}
              borderWidth="sm"
              padding="xs"
            >
              {`${color}-300`}
            </Box>
            <Box
              flex="auto"
              borderColor={`${color}-400` as BrandColor}
              borderWidth="sm"
              padding="xs"
            >
              {`${color}-400`}
            </Box>
            <Box
              flex="auto"
              borderColor={`${color}-500` as BrandColor}
              borderWidth="sm"
              padding="xs"
            >
              {`${color}-500`}
            </Box>
            <Box
              flex="auto"
              borderColor={`${color}-600` as BrandColor}
              borderWidth="sm"
              padding="xs"
            >
              {`${color}-600`}
            </Box>
            <Box
              flex="auto"
              borderColor={`${color}-700` as BrandColor}
              borderWidth="sm"
              padding="xs"
            >
              {`${color}-700`}
            </Box>
            <Box
              flex="auto"
              borderColor={`${color}-800` as BrandColor}
              borderWidth="sm"
              padding="xs"
            >
              {`${color}-800`}
            </Box>
            <Box
              flex="auto"
              borderColor={`${color}-900` as BrandColor}
              borderWidth="sm"
              padding="xs"
            >
              {`${color}-900`}
            </Box>
          </Box>
        );
      }
    })}
  </Box>
);

export const AllRowChildGap: React.FunctionComponent<BoxProps> = () => (
  <Box maxWidth="5xl" display="block" childGap="xs">
    {[...SPACING_OPTIONS].map((spacing, i) => (
      <Box childGap={spacing} direction="row" key={i}>
        <Box width="20%" background="primary-light" padding="sm">
          {spacing}
        </Box>
        <Box width="20%" background="primary-light" padding="sm">
          {spacing}
        </Box>
        <Box width="20%" background="primary-light" padding="sm">
          {spacing}
        </Box>
        <Box width="20%" background="primary-light" padding="sm">
          {spacing}
        </Box>
        <Box width="20%" background="primary-light" padding="sm">
          {spacing}
        </Box>
      </Box>
    ))}
  </Box>
);

export const AllColumnChildGap: React.FunctionComponent<BoxProps> = () => (
  <Box maxWidth="5xl" childGap="xs" direction="row">
    {[...SPACING_OPTIONS].map((spacing, i) => (
      <Box flex="auto" childGap={spacing} direction="column" key={i}>
        <Box background="primary-light" padding="sm">
          {spacing}
        </Box>
        <Box background="primary-light" padding="sm">
          {spacing}
        </Box>
        <Box background="primary-light" padding="sm">
          {spacing}
        </Box>
        <Box background="primary-light" padding="sm">
          {spacing}
        </Box>
        <Box background="primary-light" padding="sm">
          {spacing}
        </Box>
      </Box>
    ))}
  </Box>
);

export const AllFontColors: React.FunctionComponent<BoxProps> = () => (
  <>
    {[...FONT_COLOR_OPTIONS].map((color, i) => (
      <Box color={color} key={i}>
        {`${color}`}
      </Box>
    ))}
  </>
);

export const AllFontSizes: React.FunctionComponent<BoxProps> = () => (
  <>
    {[...FONT_SIZE_OPTIONS].reverse().map((fontSize, i) => (
      <Box fontSize={fontSize} key={i}>
        {`${fontSize} font size`}
      </Box>
    ))}
  </>
);

export const AllMargin: React.FunctionComponent<BoxProps> = () => (
  <>
    {[...SPACING_OPTIONS].map((spacing, i) => (
      <Box margin={spacing} background="primary-lighter" key={i}>
        {`${spacing} margin`}
      </Box>
    ))}
  </>
);

export const AllHorizontalMargin: React.FunctionComponent<BoxProps> = () => (
  <>
    {[...SPACING_OPTIONS].map((spacing, i) => (
      <Box margin={`0 ${spacing}`} background="primary-lighter" key={i}>
        {`${spacing} horizontal margin`}
      </Box>
    ))}
  </>
);

export const AllVerticalMargin: React.FunctionComponent<BoxProps> = () => (
  <>
    {[...SPACING_OPTIONS].map((spacing, i) => (
      <Box margin={`${spacing} 0`} background="primary-lighter" key={i}>
        {`${spacing} vertical margin`}
      </Box>
    ))}
  </>
);

export const AllPadding: React.FunctionComponent<BoxProps> = () => (
  <>
    {[...SPACING_OPTIONS].map((spacing, i) => (
      <Box padding={spacing} background="primary-lighter" margin="xs 0" key={i}>
        {`${spacing} padding`}
      </Box>
    ))}
  </>
);

export const AllHorizontalPadding: React.FunctionComponent<BoxProps> = () => (
  <>
    {[...SPACING_OPTIONS].map((spacing, i) => (
      <Box padding={`0 ${spacing}`} background="primary-lighter" margin="xs 0" key={i}>
        {`${spacing} horizontal padding`}
      </Box>
    ))}
  </>
);

export const AllVerticalPadding: React.FunctionComponent<BoxProps> = () => (
  <>
    {[...SPACING_OPTIONS].map((spacing, i) => (
      <Box padding={`${spacing} 0`} background="primary-lighter" margin="xs 0" key={i}>
        {`${spacing} vertical padding`}
      </Box>
    ))}
  </>
);

const Template: Story<BoxProps> = ({ propertyName, ...args }) => {
  const activeBreakpoint = useBreakpoint();
  return (
    <Box {...args} padding="sm">
      <p>{`Breakpoint: ${activeBreakpoint.name}`}</p>
      <p>{`${propertyName}: ${args[propertyName][activeBreakpoint.name]}`}</p>
    </Box>
  );
};

export const ResponsiveBackground = Template.bind({});
ResponsiveBackground.args = {
  propertyName: 'background',
  background: {
    base: 'primary-lighter',
    tablet: 'warning-lighter',
    desktop: 'danger-lighter',
    hd: 'secondary-lighter',
  } as ResponsiveProp<BrandColor>,
};
ResponsiveBackground.parameters = RESPONSIVE_STORY;

export const ResponsiveFontSize = Template.bind({});
ResponsiveFontSize.args = {
  propertyName: 'fontSize',
  fontSize: {
    base: 'md',
    tablet: 'lg',
    desktop: 'xl',
    hd: '4xl',
  } as ResponsiveProp<FontSize>,
};
ResponsiveFontSize.parameters = RESPONSIVE_STORY;

export const ResponsiveFontColor = Template.bind({});
ResponsiveFontColor.args = {
  propertyName: 'color',
  color: {
    base: 'primary',
    tablet: 'warning',
    desktop: 'danger',
    hd: 'secondary',
  } as ResponsiveProp<FontColor>,
};
ResponsiveFontColor.parameters = RESPONSIVE_STORY;

export const ResponsiveRadius = Template.bind({});
ResponsiveRadius.args = {
  propertyName: 'radius',
  radius: {
    base: 'circle', tablet: 'sm sm 0 0', desktop: '0 0 md md', hd: 'lg',
  } as ResponsiveProp<BorderRadiusSize>,
  background: 'info-100',
};
ResponsiveRadius.parameters = RESPONSIVE_STORY;

export const ResponsiveShadow = Template.bind({});
ResponsiveShadow.args = {
  propertyName: 'shadow',
  shadow: {
    base: '0', tablet: 'lg', desktop: 'xl', hd: '2xl',
  } as ResponsiveProp<BoxShadowSize>,
};
ResponsiveShadow.parameters = RESPONSIVE_STORY;