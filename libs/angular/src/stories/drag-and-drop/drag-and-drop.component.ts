import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { DiagramModel, NodeModel, RxZuDiagramComponent } from '@rxzu/angular';

@Component({
  selector: 'rxzu-root',
  template: `
    <div class="action-bar">
      <div
        *ngFor="let node of nodesLibrary"
        class="node-drag"
        draggable="true"
        [attr.data-type]="node.name"
        (dragstart)="onBlockDrag($event)"
        [ngStyle]="{ 'background-color': node.color }"
      >
        {{ node.name }}
      </div>
      <div></div>
    </div>
    <rxzu-diagram
      class="demo-diagram"
      [model]="diagramModel"
      (drop)="onBlockDropped($event)"
      (dragover)="$event.preventDefault()"
    ></rxzu-diagram>
  `,
  styleUrls: [
    '../demo-diagram.component.scss',
    './drag-and-drop.component.scss',
  ],
})
export class DragAndDropExampleStoryComponent implements AfterViewInit {
  diagramModel: DiagramModel;
  nodesDefaultDimensions = { height: 200, width: 200 };
  nodesLibrary = [
    { color: '#AFF8D8', name: 'default' },
    { color: '#FFB5E8', name: 'default' },
    { color: '#85E3FF', name: 'default' },
  ];
  @ViewChild(RxZuDiagramComponent, { static: true })
  diagram?: RxZuDiagramComponent;

  constructor() {
    this.diagramModel = new DiagramModel();
  }

  ngAfterViewInit() {
    this.diagram?.zoomToFit();
  }

  createNode(type: string) {
    const nodeData = this.nodesLibrary.find((nodeLib) => nodeLib.name === type);
    if (nodeData) {
      const node = new NodeModel({ namespace: nodeData.name });
      node.setExtras(nodeData);

      return node;
    }

    return null;
  }

  /**
   * On drag start, assign the desired properties to the dataTransfer
   */
  onBlockDrag(e: DragEvent) {
    const type = (e.target as HTMLElement).getAttribute('data-type');
    if (e.dataTransfer && type) {
      e.dataTransfer.setData('type', type);
    }
  }

  /**
   * on block dropped, create new intent with the empty data of the selected block type
   */
  onBlockDropped(e: DragEvent): void | undefined {
    if (e.dataTransfer) {
      const nodeType = e.dataTransfer.getData('type');
      const node = this.createNode(nodeType);
      const canvasManager = this.diagram?.diagramEngine.getCanvasManager();
      if (canvasManager) {
        const droppedPoint = canvasManager.getZoomAwareRelativePoint(e);

        const coords = {
          x: droppedPoint.x - this.nodesDefaultDimensions.width / 2,
          y: droppedPoint.y - this.nodesDefaultDimensions.height / 2,
        };

        if (node) {
          node.setCoords(coords);
          this.diagramModel.addNode(node);
        }
      }
    }
  }
}
