import { Injectable } from '@angular/core';
import { DiagramEngine } from '@rxzu/core';
import { FactoryService } from './factory.service';

@Injectable()
export class EngineService extends DiagramEngine {
  constructor(protected override factory: FactoryService) {
    super(factory);
  }
}
