import { PointModel } from '../models/point.model';
import { NodeModel } from '../models/node.model';
import { LinkModel } from '../models/link.model';
import { PortModel } from '../models';
import { BaseAction } from './base.action';

export class ClickAction extends BaseAction {
  model: NodeModel | PortModel | PointModel | LinkModel;

  constructor(_model: NodeModel | PointModel | PortModel | LinkModel) {
    super();
    this.model = _model;
  }
}
