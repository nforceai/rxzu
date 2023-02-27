import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { MODEL, LinkModel, DefaultLinkComponent } from '@rxzu/angular';

@Component({
  selector: 'rxzu-gh-workflow-link',
  templateUrl: './gh-workflow-link.component.html',
  styleUrls: ['./gh-workflow-link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GHWorkflowLinkComponent extends DefaultLinkComponent {
  @ViewChild('labelLayer', { read: ViewContainerRef, static: true })
  declare labelLayer: ViewContainerRef;

  constructor(
    @Inject(MODEL) public override model: LinkModel,
    cdRef: ChangeDetectorRef
  ) {
    super(model, cdRef);
  }
}
