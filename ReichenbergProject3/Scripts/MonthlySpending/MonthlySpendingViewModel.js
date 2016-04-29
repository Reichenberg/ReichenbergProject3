//
function MonthlySpendingViewModel() {
    var self = this;

    self.Items = ko.observableArray();
    self.SelectedItem = ko.observable(new Item());

    self.Months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    self.SelectedMonth = ko.observable();
    self.Actions = ["Increase", "Decrease", "Reset"];
    self.SelectedAction = ko.observable();
    self.amount = ko.observable(0);


    //Computed observable to control if Input is disabled
    self.SelectMonthDisabled = ko.computed(function () {
        if (!self.SelectedItem())
        {
            self.SelectedItem(new Item());
        }
        if (self.SelectedItem().Id() == 0) {
            return true;
        }
        else {
            return false;
        }
    }, this);

    //Computed observable to control if Input is disabled
    self.SelectActionDisabled = ko.computed(function () {
        if (!self.SelectedItem()) {
            self.SelectedItem(new Item());
        }
        if (self.SelectedItem().Id() == 0) {
            return true;
        }
        else {
            return false;
        }
    }, this);

    //Computed observable to control if Input is disabled
    self.AmountDisabled = ko.computed(function () {
        if (!self.SelectedItem()) {
            self.SelectedItem(new Item());
        }
        if (self.SelectedItem().Id() == 0 || !self.SelectedAction() || self.SelectedAction() === "Reset") {
            return true;
        }
        else {
            return false;
        }
    }, this);

    //Computed observable to control if Input is disabled
    self.DeleteDisabled = ko.computed(function () {
        if (!self.SelectedItem()) {
            self.SelectedItem(new Item());
        }
        if (self.SelectedItem().Id() == 0) {
            return true;
        }
        else {
            return false;
        }
    }, this);

    //Computed observable to control if Input is disabled
    self.UpdateDisabled = ko.computed(function () {
        if (!self.SelectedItem()) {
            self.SelectedItem(new Item());
        }
        if (self.SelectedItem().Id() == 0 || !self.SelectedAction()) {
            return true;
        }
        else {
            return false;
        }
    }, this);

    //Holds Item to be created
    self.NewItemName = ko.observable();

    //Method call to create new item 
    self.CreateItem = function () {
        self.Items;
        $.ajax({
            type: "GET",
            url: "home/create",
            data: { name: self.NewItemName() },
            success: function (data) {
                self.NewItemName("");
                self.UpdateItems();
            },
            error: function (data) {
                alert(data.Message);
            }
        });
    }

    //Method call to delete item
    self.DeleteItem = function () {
        $.ajax({
            type: "GET",
            url: "home/delete",
            data: {
                Id: self.SelectedItem().Id
            },
            success: function (data) {
                alert(data.Message);
                self.UpdateItems();
            },
            error: function (data) {
                alert(data.Message);
            }
        });
    }

    //Method call to update item
    self.UpdateItem = function () {
        if (self.amount() < 0)
        {
            $('#Amount').tooltip({ title: "This value cannot be negative." });
            $('#Amount').tooltip("show");
            return false;
        }
        $.ajax({
            type: "POST",
            url: "home/Update",
            data: {
                Id: self.SelectedItem().Id(),
                month: self.SelectedMonth(),
                action: self.SelectedAction(),
                amount: self.amount()
            },
            success: function (data) {
                $('#Amount').tooltip("destroy");
                self.UpdateItems();
            },
            error: function (data) {
                alert(data.Message);
            }
        });
    }

    //Method call to update items on page
    self.UpdateItems = function () {
        $.ajax({
            type: "POST",
            url: "Home/UpdateItemData",
            success: function (data) {
                var mappedItems = $.map(data, function (item) { return new Item(item); });
                self.SelectedItem(new Item());
                self.Items(mappedItems);
                self.UpdateChart();
            },
            error: function (data) {
                alert("Error getting items.");
            }
        });
    }

    //Method call to update bar graph containing items
    self.UpdateChart = function () {
        if (self.SelectedItem().Id() == 0)
        {
            var chart = new CanvasJS.Chart("spendingData", {
                theme: "theme1",//theme1
                title: {
                    text: "Item"
                },
                toolTip: {
                    content: "Amount: ${y}"
                },
                animationEnabled: true,  
                data: [
                {
                    type: "column",
                    dataPoints: [
                        { label: "Jan", y:0  },
                        { label: "Feb", y:0 },
                        { label: "Mar", y:0 },
                        { label: "Apr", y:0 },
                        { label: "May", y: 0 },
                        { label: "Jun", y: 0},
                        { label: "Jul", y: 0},
                        { label: "Aug", y: 0 },
                        { label: "Sep", y: 0 },
                        { label: "Oct", y: 0 },
                        { label: "Nov", y: 0 },
                        { label: "Dec", y: 0 }
                    ]
                }
                ]
            });
            chart.render();
        }
        var chart = new CanvasJS.Chart("spendingData", {
            theme: "theme1",//theme1
            title: {
                text: self.SelectedItem().Name()
            },
            toolTip: {
                content: "Amount: ${y}"
            },
            animationEnabled: true,  
            data: [
            {
                
                type: "column",
                dataPoints: [
                    { label: "Jan", y: self.SelectedItem().January()},
                    { label: "Feb", y: self.SelectedItem().February() },
                    { label: "Mar", y: self.SelectedItem().March() },
                    { label: "Apr", y: self.SelectedItem().April() },
                    { label: "May", y: self.SelectedItem().May() },
                    { label: "Jun", y: self.SelectedItem().June() },
                    { label: "Jul", y: self.SelectedItem().July() },
                    { label: "Aug", y: self.SelectedItem().August() },
                    { label: "Sep", y: self.SelectedItem().September() },
                    { label: "Oct", y: self.SelectedItem().October() },
                    { label: "Nov", y: self.SelectedItem().November() },
                    { label: "Dec", y: self.SelectedItem().December() }
                ]
            }
            ]
        });
        chart.render();
    }

    //Subscription method to update the chart every time the Selected Item changes
    self.SelectedItem.subscribe(function () {
        self.UpdateChart();
    }, null, "change");


}