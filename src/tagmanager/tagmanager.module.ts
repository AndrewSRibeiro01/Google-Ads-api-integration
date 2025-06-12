import { Module } from '@nestjs/common';
import { TagManagerService } from './tagmanager.service';

@Module({
    providers: [TagManagerService],
    exports: [TagManagerService],
})
export class TagmanagerModule { }
