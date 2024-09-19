import { expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import GraphComponent from '../components/GraphComponent.vue';

function getComponentWrapper(props = {}) {
  return mount(GraphComponent, {
    props
  });
}

test('it should render graph on mount', async () => {
  expect(GraphComponent).toBeTruthy();
  const wrapper = getComponentWrapper({
    graphData: [
      {
        name: '東京都',
        data: [123232, 65456, 2342342]
      }
    ]
  });
  const graph = wrapper.find('.highcharts-container');

  expect(graph).toBeTruthy();
});
