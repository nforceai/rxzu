import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import {
  DiagramModel,
  LabelModel,
  NodeModel,
  PortModel,
  RxZuDiagramComponent,
} from '@rxzu/angular';
import { animationFrameScheduler, interval, Observable } from 'rxjs';
import { bufferTime, map } from 'rxjs/operators';

@Component({
  selector: 'rxzu-root',
  template: `
    <div class="action-bar">
      <button (click)="resetDiagram()" *ngIf="isResseted === false">
        Reset
      </button>
      <button (click)="createDiagram()" *ngIf="isResseted">Paint</button>
      FPS: {{ fps$ | async }} Rendered {{ numberOfNodes }} nodes and links in
      {{ initialRenderTimer | number : '1.0-0' }} ms
    </div>
    <rxzu-diagram class="demo-diagram" [model]="diagramModel"></rxzu-diagram>
  `,
  styleUrls: ['../demo-diagram.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PerformanceExampleStoryComponent {
  diagramModel: DiagramModel;
  fps$: Observable<number> = interval(0, animationFrameScheduler).pipe(
    bufferTime(1000),
    map((value) => value.length)
  );

  initialRenderTimer = 0;
  isResseted = true;
  numberOfNodes = 0;
  numberOfNodesToCreate = 500;
  @ViewChild(RxZuDiagramComponent, { static: true })
  diagram?: RxZuDiagramComponent;

  constructor() {
    this.diagramModel = new DiagramModel();
  }

  createDiagram() {
    this.createNodes();
    this.diagram?.zoomToFit();
    this.numberOfNodes = this.numberOfNodesToCreate;
  }

  resetDiagram() {
    this.diagramModel.reset();
    this.isResseted = true;
  }

  createNodes() {
    this.isResseted = false;
    const startTime = performance.now();
    const nodes = [];
    const links = [];
    const labels = [];

    let prevPort: PortModel | null = null;
    for (let index = 0; index < this.numberOfNodesToCreate; index++) {
      const nodeLoop = new NodeModel({ id: `${index}` });
      const row = index % 10;
      const col = Math.floor(index / 10);
      nodeLoop.setCoords({ x: 1000 * row, y: 300 * col });
      const inPort = new PortModel({ id: `${index}` });
      const outPort = new PortModel();
      nodeLoop.addPort(inPort);
      const outport = nodeLoop.addPort(outPort);
      nodes.push(nodeLoop);

      if (prevPort) {
        const link = outport.link(prevPort);

        if (link) {
          const label = new LabelModel({ text: 'label' });
          link.setLabel(label);
          links.push(link);
          labels.push(label);
        }
      }

      prevPort = inPort;
    }

    this.diagramModel.addAll(...nodes, ...links, ...labels);
    const endTime = performance.now();
    this.initialRenderTimer = endTime - startTime;
  }
}
