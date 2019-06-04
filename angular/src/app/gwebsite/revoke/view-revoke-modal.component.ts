import { RevokeForViewDto } from './../../../shared/service-proxies/service-proxies';
import { AppComponentBase } from "@shared/common/app-component-base";
import { AfterViewInit, Injector, Component, ViewChild } from "@angular/core";
import { RevokeServiceProxy } from "@shared/service-proxies/service-proxies";
import { ModalDirective } from 'ngx-bootstrap';

@Component({
    selector: 'viewRevokeModal',
    templateUrl: './view-revoke-modal.component.html'
})

export class ViewRevokeModalComponent extends AppComponentBase {

    revoke : RevokeForViewDto = new RevokeForViewDto();
    @ViewChild('viewModal') modal: ModalDirective;

    constructor(
        injector: Injector,
        private _revokeService: RevokeServiceProxy
    ) {
        super(injector);
    }

    show(revokeId?: number | null | undefined): void {
        this._revokeService.getRevokeForView(revokeId).subscribe(result => {
            this.revoke = result;
            this.modal.show();
        })
    }

    close() : void{
        this.modal.hide();
    }
}