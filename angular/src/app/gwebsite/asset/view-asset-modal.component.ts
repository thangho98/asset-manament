import { AssetForViewDto, AssetGroupServiceProxy } from './../../../shared/service-proxies/service-proxies';
import { AppComponentBase } from "@shared/common/app-component-base";
import { AfterViewInit, Injector, Component, ViewChild } from "@angular/core";
import { AssetServiceProxy } from "@shared/service-proxies/service-proxies";
import { ModalDirective } from 'ngx-bootstrap';

@Component({
    selector: 'viewAssetModal',
    templateUrl: './view-asset-modal.component.html'
})

export class ViewAssetModalComponent extends AppComponentBase {

    assetGroupName: string = "";
    asset: AssetForViewDto = new AssetForViewDto();
    @ViewChild('viewModal') modal: ModalDirective;

    constructor(
        injector: Injector,
        private _assetService: AssetServiceProxy,
        private _assetgroupService: AssetGroupServiceProxy,
    ) {
        super(injector);
    }

    show(assetId?: number | null | undefined): void {
        this._assetService.getAssetForView(assetId).subscribe(result => {
            this.asset = result;
            this.modal.show();
        })
    }

    close(): void {
        this.modal.hide();
    }

    getNameAssetGroupParent(): void {
        this._assetgroupService.getAssetGroupNameByAssetID(this.asset.assetGrouptId).subscribe(result => {
            if (result != null)
                this.assetGroupName = result;
        });
    }
}