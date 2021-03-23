import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { Box } from '../Box/Box';
import { Tabs, TabsProps } from './Tabs';
import { TabPanels } from './TabPanels';

export default {
  title: 'Components/Tabs/Playground',
  component: Tabs,
  argTypes: {
    value: {
      control: {
        type: 'select',
        options: [0, 1, 2],
      },
    },
    size: {
      control: 'text',
    },
    isCentered: {
      control: {
        type: 'boolean',
      },
    },
    isFullWidth: {
      control: {
        type: 'boolean',
      },
    },
    disabledTabs: {
      control: {
        type: 'check',
        options: [0, 1, 2],
      },
    },
  },
} as Meta;

const Template: Story<TabsProps> = ({
  value,
  size,
  disabledTabs,
  ...args
}) => {
  return (
    <Box childGap="md">
      <Tabs value={value} size={size} {...args}>
        <Tabs.Item isDisabled={disabledTabs.includes(0)}>
          Tab 1
        </Tabs.Item>
        <Tabs.Item isDisabled={disabledTabs.includes(1)}>
          Tab 1
        </Tabs.Item>
        <Tabs.Item isDisabled={disabledTabs.includes(2)}>
          Tab 1
        </Tabs.Item>
      </Tabs>
      <TabPanels value={value}>
        <Box padding="md" background="grey-50">
          Panel 0
        </Box>
        <Box padding="md" background="grey-50">
          Panel 1
        </Box>
        <Box padding="md" background="grey-50">
          Panel 2
        </Box>
      </TabPanels>
    </Box>
  );
};

export const Playground = Template.bind({});

Playground.args = {
  value: 1,
  size: "md",
  disabledTabs: [],
};

