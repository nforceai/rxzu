import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { ZoomToNodeExampleStoryComponent } from './zoom-to-node.component';
import { RxZuDefaultsModule } from '../../lib/defaults';

export default {
  title: 'Zoom To Node',
  parameters: { docs: { iframeHeight: '400px' } },
  decorators: [
    moduleMetadata({
      declarations: [ZoomToNodeExampleStoryComponent],
      providers: [],
      imports: [CommonModule, RxZuDefaultsModule],
    }),
  ],
} as Meta;

const template: Story<ZoomToNodeExampleStoryComponent> = (args: any) => ({
  component: ZoomToNodeExampleStoryComponent,
  props: args,
});

export const ZoomToNode = template.bind({});
