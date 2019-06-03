import { AssetGroupForViewDto } from './../../../shared/service-proxies/service-proxies';
import { AppComponentBase } from "@shared/common/app-component-base";
import { AfterViewInit, Injector, Component, ViewChild } from "@angular/core";
import { AssetGroupServiceProxy } from "@shared/service-proxies/service-proxies";
import { ModalDirective } from 'ngx-bootstrap';

@Component({
    selector: 'viewAssetGroupModal',
    templateUrl: './view-assetgroup-modal.component.html'
})

export class ViewAssetGroupModalComponent extends AppComponentBase {

    assetgroup: AssetGroupForViewDto = new AssetGroupForViewDto();
    @ViewChild('viewModal') modal: ModalDirective;

    constructor(
        injector: Injector,
        private _assetgroupService: AssetGroupServiceProxy
    ) {
        super(injector);
    }

    show(assetgroupId?: number | null | undefined): void {
        this._assetgroupService.getAssetGroupForView(assetgroupId).subscribe(result => {
            this.assetgroup = result;
            this.modal.show();
        })
    }

    close(): void {
        this.modal.hide();
    }

    getNameAssetGroupParent(assetGroupId): string {
        let name: string;
        this._assetgroupService.getAssetGroupNameByAssetID(assetGroupId).subscribe(result => {
            name = result;
        });
        return name;
    }
}