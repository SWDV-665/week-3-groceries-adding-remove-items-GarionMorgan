import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
//library for toast from ionic
import { ToastController } from '@ionic/angular';
//library for alerts through ionic
import { AlertController } from '@ionic/angular';
@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
    //Interpolation that can change the title of the header
    title = "Grocery"
    //items within the app pre-built.
    items = [
        {
            name: "Milk",
            quantity: 2
        },
        {
            name: "Bread",
            quantity: 1
        },
        {
            name: "Meat",
            quantity: 5
        },
        {
            name: "Soda",
            quantity: 8
        },
    ];
    //calls upon navCtrl, toastCtrl, and alertCtrl
    constructor(public navCtrl: NavController, public toastCtrl: ToastController,
        public alertController: AlertController) {
    }
    //toast function that removes an item. Displays that item is removed
    async removeItem(item, index) {
        console.log("Removing Item - ", item, index);
        const toast = await this.toastCtrl.create({
            message: "Removing Item - " + index + " ...",
            duration: 3000
        });
        toast.present();
        //splices the array to show an item being removed
        this.items.splice(index, 1);
    }
    //add functionaility for tab1 page.html
    async addItem() {
        console.log("adding item");
        this.presentAlert();
    }
    //alert function that allows user to enter a new grocery item
    async presentAlert() {
        const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: 'Add Item',
            subHeader: '',
            message: 'Please enter item...',
            inputs: [{
                name: 'name',
                placeholder: 'Name'
            },
            {
                name: 'quantity',
                placeholder: 'Quantity'
            }
            ],
            buttons: [{
                text: 'Cancel',
                handler: data => {
                    console.log('Cancel clicked');
                }
            },
            {
                //saves the name and quantity input and inserts to array
                text: 'Save',
                handler: data => {
                    console.log('Saved clicked', data);
                    this.items.push(data);
                }
            }
            ]
        });
        await alert.present();
        const { role } = await alert.onDidDismiss();
        console.log('onDidDismiss resolved with role', role);
    }
}