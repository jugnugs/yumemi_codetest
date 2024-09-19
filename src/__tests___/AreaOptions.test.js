import { mount } from '@vue/test-utils';
import { expect, test } from 'vitest';
import AreaOptions from '../components/AreaOptions.vue';

const mockPrefectureData = [
  {
    prefCode: 1,
    prefName: '北海道'
  },
  {
    prefCode: 2,
    prefName: '青森県'
  },
  {
    prefCode: 3,
    prefName: '岩手県'
  },
  {
    prefCode: 4,
    prefName: '宮城県'
  },
  {
    prefCode: 5,
    prefName: '秋田県'
  }
];

function getComponentWrapper(props = {}) {
  return mount(AreaOptions, {
    props
  });
};

test('render prefecture data on mount', async () => {
  expect(AreaOptions).toBeTruthy();

  const wrapper = getComponentWrapper({
    areaData: mockPrefectureData
  });
  const checkboxes = wrapper.findAll("label:has(input[type='checkbox'])");
  expect(checkboxes).toHaveLength(5);

  // check labels are rendered with correct text
  const checkText = checkboxes.filter((c, index) => c.text === mockPrefectureData[index].prefName);
  expect(checkText).toBeTruthy();
});
