import { flushPromises, mount } from '@vue/test-utils';
import { expect, test, vi } from 'vitest';
import App from '../App.vue';
import axios from 'axios';

const mockPrefectureData = [
    {
        "prefCode": 1,
        "prefName": "北海道"
    },
    {
        "prefCode": 2,
        "prefName": "青森県"
    },
    {
        "prefCode": 3,
        "prefName": "岩手県"
    },
    {
        "prefCode": 4,
        "prefName": "宮城県"
    },
    {
        "prefCode": 5,
        "prefName": "秋田県"
    }
];

test('fetch prefecture data on initial render', async () => {
    expect(App).toBeTruthy();

    vi.spyOn(axios, 'get').mockResolvedValue(mockPrefectureData);
    mount(App);

    await flushPromises();

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveReturnedWith(mockPrefectureData);
});
