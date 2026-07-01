import type { Meta, StoryObj } from '@storybook/react';
import { Notification } from './Notification';
import { NotificationType } from '@/constants/enums';

const meta = {
  title: 'Molecules/Notification',
  component: Notification,
} satisfies Meta<typeof Notification>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: {
    type: NotificationType.SUCCESS,
    text1: 'Booking Confirmed',
    text2: 'Your session has been booked successfully.',
  },
};

export const Error: Story = {
  args: {
    type: NotificationType.ERROR,
    text1: 'Something went wrong',
    text2: 'Please try again later.',
  },
};

export const Warning: Story = {
  args: {
    type: NotificationType.WARNING,
    text1: 'Slots Running Low',
    text2: 'Only 2 slots remaining for this session.',
  },
};

export const Info: Story = {
  args: {
    type: NotificationType.INFO,
    text1: 'Session Starts Soon',
    text2: 'Your session begins in 30 minutes.',
  },
};
