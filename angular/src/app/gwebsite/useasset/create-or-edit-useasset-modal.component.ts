import { Component, ElementRef, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ModalDirective } from 'ngx-bootstrap';
import { UseAssetServiceProxy, UseAssetInput, AssetForViewDto, AssetGroupForViewDto, AssetServiceProxy, AssetGroupServiceProxy, OrganizationUnitDto, OrganizationUnitServiceProxy, OrganizationUnitUserListDto, UseAssetDto } from '@shared/service-proxies/service-proxies';
import { moment } from 'ngx-bootstrap/chronos/test/chain';


@Component({
    selector: 'createOrEditUseAssetModal',
    templateUrl: './create-or-edit-useasset-modal.component.html'
})
export class CreateOrEditUseAssetModalComponent extends AppComponentBase {


    @ViewChild('createOrEditModal') modal: ModalDirective;
    @ViewChild('useassetCombobox') useassetCombobox: ElementRef;
    @ViewChild('iconCombobox') iconCombobox: ElementRef;
    @ViewChild('dateInput') dateInput: ElementRef;


    /**
    * @Output dùng để public event cho component khác xử lý
    */
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    saving = false;

    useasset: UseAssetInput = new UseAssetInput();

    listAssetInStock: AssetForViewDto[];
    assetSelect: AssetForViewDto = new AssetForViewDto();
    assetType: string = "";
    assetGroup: AssetGroupForViewDto = new AssetGroupForViewDto();
    listUseAsset: UseAssetDto[];
    listOrganizationUnit: OrganizationUnitDto[];
    listOrganizationUnitUser: OrganizationUnitUserListDto[];
    dateEndDepreciation: string = "";

    userName: string = "";
    unitName: string = "";

    constructor(
        injector: Injector,
        private _useassetService: UseAssetServiceProxy,
        private _assetService: AssetServiceProxy,
        private _assetgroupService: AssetGroupServiceProxy,
        private _organizationunitService: OrganizationUnitServiceProxy,
        private _organizationunituserService: OrganizationUnitServiceProxy,
    ) {
        super(injector);
    }

    ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        this.getListAssetsInStock();
        this.getOrganizationUnit();
    }

    show(useassetId?: number | null | undefined): void {
        this.saving = false;
        this.getListAssetsInStock();
        this._useassetService.getUseAssetForEdit(useassetId).subscribe(result => {
            this.useasset = result;
            this.modal.show();
            if (!this.useasset.id) {
                this.useasset.dateExport = moment().format('YYYY-MM-DD');
            }
            else {
                this.getAssetByID(this.useasset.assetId);
            }
            this.modal.show();
        })
    }

    save(): void {
        let input = this.useasset;
        this.saving = true;
        this._useassetService.createOrEditUseAsset(input).subscribe(result => {
            this.notify.info(this.l('SavedSuccessfully'));
            this.close();
        })

    }

    close(): void {
        this.modal.hide();
        this.modalSave.emit(null);
    }

    getListAssetsInStock(): void {
        this._assetService.getListAssetsInStock().subscribe(result => {
            this.listAssetInStock = result;
            this.getListUseAssetNotApproved();
        });
    }

    getAssetByID(assetID: string): void {
        this._assetService.getAssetByAssetID(assetID).subscribe(result => {
            this.assetSelect = result;
            if (this.assetSelect.assetType == 0) {
                this.assetType = "Công cụ lao động";
            }
            else {
                this.assetType = "Tài sản cố định";
            }
            let date = new Date(this.assetSelect.dateAdded);
            date.setMonth(date.getMonth() + this.assetSelect.monthOfDepreciation);
            this.dateEndDepreciation = moment(date).format('YYYY-MM-DD');
            this.getAssetGroup();
        });
    }

    getAssetGroup(): void {
        this._assetgroupService.getAssetGroupByAssetID(this.assetSelect.assetGrouptId).subscribe(result => {
            if (result != null)
                this.assetGroup = result;
        });
    }

    filterListAssetInStock(): void {
        this.listUseAsset.forEach(useAss => {
            this.listAssetInStock = this.listAssetInStock.filter(item => {
                if (item.assetId.toLowerCase() != useAss.assetId.toLowerCase()) {
                    return item;
                }
            }
            );
        });

        if (this.listAssetInStock.length > 1) {
            this.getAssetByID(this.listAssetInStock[0].assetId);
            this.useasset.assetId = this.listAssetInStock[0].assetId;
        }
    }

    getListUseAssetNotApproved(): void {
        this._useassetService.getListUsseAssetNoteApproved().subscribe(
            result => {
                this.listUseAsset = result;
                this.filterListAssetInStock();
            }
        );
    }

    getOrganizationUnit(): void {
        this._organizationunitService.getOrganizationUnits().subscribe(
            result => {
                if (result != null)
                    this.listOrganizationUnit = result.items;
            }
        );
    }

    getOrgannizationUnitUser(id: number): void {
        this._organizationunituserService.getListUsersOrganizationUnit(id).subscribe(
            result => {
                if (result != null)
                    this.listOrganizationUnitUser = result.items;
            }
        )
    }
}