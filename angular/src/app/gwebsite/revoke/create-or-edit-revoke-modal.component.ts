import { Component, ElementRef, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ModalDirective } from 'ngx-bootstrap';
import { RevokeServiceProxy, RevokeInput } from '@shared/service-proxies/service-proxies';


@Component({
    selector: 'createOrEditRevokeModal',
    templateUrl: './create-or-edit-revoke-modal.component.html'
})
export class CreateOrEditRevokeModalComponent extends AppComponentBase {


    @ViewChild('createOrEditModal') modal: ModalDirective;
    @ViewChild('revokeCombobox') revokeCombobox: ElementRef;
    @ViewChild('iconCombobox') iconCombobox: ElementRef;
    @ViewChild('dateInput') dateInput: ElementRef;


    /**
     * @Output dùng để public event cho component khác xử lý
     */
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    saving = false;

    revoke: RevokeInput = new RevokeInput();

    constructor(
        injector: Injector,
        private _revokeService: RevokeServiceProxy
    ) {
        super(injector);
    }

    show(revokeId?: number | null | undefined): void {
        this.saving = false;


        this._revokeService.getRevokeForEdit(revokeId).subscribe(result => {
            this.revoke = result;
            this.modal.show();

        })
    }

    save(): void {
        let input = this.revoke;
        this.saving = true;
        this._revokeService.createOrEditRevoke(input).subscribe(result => {
            this.notify.info(this.l('SavedSuccessfully'));
            this.close();
        })

    }

    close(): void {
        this.modal.hide();
        this.modalSave.emit(null);
    }
}
