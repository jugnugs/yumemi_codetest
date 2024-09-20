import { mount } from '@vue/test-utils';
import { expect, test } from 'vitest';
import MenuOptions from '../components/MenuOptions.vue';

function getComponentWrapper(props = {}) {
  return mount(MenuOptions, {
    props
  });
}

test('should render menu options as checkboxes on mount', async () => {
    expect(MenuOptions).toBeTruthy();
    const wrapper = getComponentWrapper();

    const radioboxes = wrapper.findAll("label:has(input[type='radio'])");
    expect(radioboxes).toHaveLength(4);

    expect(radioboxes[0].element.textContent).toEqual("総人口");
    expect(radioboxes[1].element.textContent).toEqual("年少人口");
    expect(radioboxes[2].element.textContent).toEqual("生産年齢人口");
    expect(radioboxes[3].element.textContent).toEqual("老年人口");
});

test('inputs check and uncheck upon click', async () => {
    const wrapper = getComponentWrapper();

    const radioboxes = wrapper.findAll("input[type='radio']");
    const firstRadiobox = radioboxes[0];
    const secondRadiobox = radioboxes[1];

    await firstRadiobox.trigger('click');
    expect(firstRadiobox.element.checked).toBeTruthy();
    expect(secondRadiobox.element.checked).toBeFalsy();

    await secondRadiobox.trigger('click');
    expect(firstRadiobox.element.checked).toBeFalsy();
    expect(secondRadiobox.element.checked).toBeTruthy();
});

test('selected radio button is checked', async () => {
    const wrapper = getComponentWrapper({
        modelValue: "総人口"
    });

    const radioboxes = wrapper.findAll("input[type='radio']");
    const firstRadiobox = radioboxes[0];
    const thirdRadiobox = radioboxes[2];

    expect(firstRadiobox.element.checked).toBeTruthy();
    expect(thirdRadiobox.element.checked).toBeFalsy();

    await wrapper.setProps({
        modelValue: "生産年齢人口"
    });
    expect(firstRadiobox.element.checked).toBeFalsy();
    expect(thirdRadiobox.element.checked).toBeTruthy();
});