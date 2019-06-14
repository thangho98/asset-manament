import { Component, ElementRef, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ModalDirective } from 'ngx-bootstrap';
import { RepairServiceProxy, RepairInput, AssetForViewDto, AssetServiceProxy, AssetGroupServiceProxy, AssetGroupForViewDto, RepairDto, UserListDto, UserServiceProxy, UseAssetForViewDto, OrganizationUnitDto, OrganizationUnitServiceProxy } from '@shared/service-proxies/service-proxies';
import { moment } from 'ngx-bootstrap/chronos/test/chain';
import { debug } from 'util';


@Component({
    selector: 'createOrEditRepairModal',
    templateUrl: './create-or-edit-repair-modal.component.html'
})
export class CreateOrEditRepairModalComponent extends AppComponentBase {


    @ViewChild('createOrEditModal') modal: ModalDirective;
    @ViewChild('repairCombobox') repairCombobox: ElementRef;
    @ViewChild('iconCombobox') iconCombobox: ElementRef;
    @ViewChild('dateInput') dateInput: ElementRef;


    /**
    * @Output dùng để public event cho component khác xử lý
    */
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    saving = false;

    listUsers: UserListDto[];
    listRepairs: RepairDto[];
    listAssetsNotLiquidated: AssetForViewDto[];
    
    assetGroup: AssetGroupForViewDto = new AssetGroupForViewDto();
    asset: AssetForViewDto = new AssetForViewDto();
    
    repairInput: RepairInput = new RepairInput();
    assetType: string = "";

    // Ngày hết hạn khấu hao
    dateEndDepreciation: string = "";
    
    // Đơn vị đề xuất
    proposerUnit: string = "";

    //useasset: UseAssetForViewDto = new UseAssetForViewDto();

    constructor(
        injector: Injector,
        private _repairService: RepairServiceProxy,
        private _assetService: AssetServiceProxy,
        private _assetGroupService: AssetGroupServiceProxy,
        private _userService: UserServiceProxy,
        private _organizationUnitService: OrganizationUnitServiceProxy
    ) {
        super(injector);
    }

    ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        this.getListAssetsNotLiquidated();
        this.getListUsers();

        //this.repairInput.assetId = '';
        //this.repairInput.exportDate = '';
        //this.repairInput.expectedDateRepaired = '';
        //this.repairInput.expectedRepairUnit = 0;
        //this.repairInput.proposer = '';
        //this.repairInput.staffInCharge = '';
        //this.repairInput.expectedCost = 0;
        //this.repairInput.expectedContent = '';
        //this.repairInput.expectedNote = '';
        //this.repairInput.dateRepaired = '';
        //this.repairInput.repairUnit = 0;
        //this.repairInput.cost = 0;
        //this.repairInput.content = '';
        //this.repairInput.note = '';
        //this.repairInput.status = false;
        //this.repairInput.statusApproved = false;
    }

    show(repairId?: number | null | undefined): void {
        this.saving = false;
        this.getListAssetsNotLiquidated();
        this.getListUsers();
        this._repairService.getRepairForEdit(repairId).subscribe(result => {
            this.repairInput = result;
            if (!this.repairInput.id) {
                this.repairInput.exportDate = moment().format('YYYY-MM-DD');
                this.repairInput.dateRepaired = "";
                this.repairInput.repairUnit = "";
                this.repairInput.cost = 0;
                this.repairInput.isChangeFunction = false;
                this.repairInput.content = "";
                this.repairInput.note = "";
                this.repairInput.status = false;
                this.repairInput.statusApproved = false;
            }
            else {
                this.getAssetByID(this.repairInput.assetId);
            }
            this.modal.show();
            console.log(this);
        })
        
    }

    save(): void {
        let input = this.repairInput;
        this.saving = true;
        this._repairService.createOrEditRepair(input).subscribe(result => {
            this.notify.info(this.l('SavedSuccessfully'));
            this.close();
        })

    }

    close(): void {
        this.modal.hide();
        this.modalSave.emit(null);
    }

    getListAssetsNotLiquidated(): void {
        this._assetService.getListAssetsNotLiquidated().subscribe(result => {
            this.listAssetsNotLiquidated = result;
            this.getListRepairNotApproved();
        });
    }

    getAssetByID(assetID: string): void {
        this._assetService.getAssetByAssetID(assetID).subscribe(result => {
            this.asset = result;
            if (this.asset.assetType == 0) {
                this.assetType = "Công cụ lao động";
            }
            else {
                this.assetType = "Tài sản cố định";
            }
            let date = new Date(this.asset.dateAdded);
            date.setMonth(date.getMonth() + this.asset.monthOfDepreciation);
            this.dateEndDepreciation = moment(date).format('YYYY-MM-DD');
            this.getAssetGroup();
        });
    }

    getAssetGroup(): void {
        this._assetGroupService.getAssetGroupByAssetID(this.asset.assetGrouptId).subscribe(result => {
            if (result != null)
                this.assetGroup = result;
        });
    }

    filterListAssetsNotLiquidated(): void {
        this.listRepairs.forEach(rep => {
            this.listAssetsNotLiquidated = this.listAssetsNotLiquidated.filter(item => {
                if (item.assetId.toLowerCase() != rep.assetId.toLowerCase()) {
                    return item;
                }
            }
            );
        });

        if (this.listAssetsNotLiquidated.length > 1) {
            this.getAssetByID(this.listAssetsNotLiquidated[0].assetId);
            this.repairInput.assetId = this.listAssetsNotLiquidated[0].assetId;
        }
    }

    getListRepairNotApproved(): void {
        this._repairService.getListRepairNotApproved().subscribe(
            result => {
                this.listRepairs = result;
                this.filterListAssetsNotLiquidated();
            }
        );
    }

    getListUsers(){
        this._userService.getListUsers().subscribe(
            result =>{
                this.listUsers = result;
                if (this.listUsers.length > 0) {
                    this.getUserUnit(this.listUsers[0].id);
                }
            }
        )
    }

    getUserUnit(id: number): void
    {
        this.proposerUnit = '';
        this._userService.getUserForEdit(id).subscribe(
                result => {
                result.memberedOrganizationUnits.forEach( code =>{
                    this.proposerUnit += code.toString();
                    this._organizationUnitService.getOrganizationUnitByCode(code).subscribe(result1 => {
                        if (this.proposerUnit.length > 0)
                            this.proposerUnit += ' ' + result1.displayName;
                        else
                            this.proposerUnit = result1.displayName;
                    });
                });
            }
        )
    }
}