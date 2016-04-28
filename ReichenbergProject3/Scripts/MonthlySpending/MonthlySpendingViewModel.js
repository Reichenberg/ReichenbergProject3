function MonthlySpendingViewModel() {
    var self = this;

    self.Items = ko.observableArray();
    self.SelectedItem = ko.observable();

    self.Months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    self.SelectedMonth = ko.observable();
    self.Actions = ["Increase", "Decrease", "Reset"];
    self.SelectedAction = ko.observable();
    self.amount = ko.observable(0);

    //Holds Item to be created
    self.NewItemName = ko.observable();



    self.CreateItem = function () {
        self.Items;
        $.ajax({
            type: "GET",
            url: "home/create",
            data: { name: self.NewItemName() },
            success: function (data) {
                alert(data.Message);
                self.UpdateItems();
            },
            error: function (data) {
                alert(data.Message);
            }
        });
    }

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

    self.UpdateItem = function () {
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
                alert(data.Message);
                self.UpdateItems();
            },
            error: function (data) {
                alert(data.Message);
            }
        });
    }

    self.UpdateItems = function () {
        $.ajax({
            type: "POST",
            url: "Home/UpdateItemData",
            success: function (data) {
                var mappedItems = $.map(data, function (item) { return new Item(item); });
                self.Items(mappedItems);
                self.UpdateChart();
            },
            error: function (data) {
                alert("Error getting items.");
            }
        });
    }

    self.UpdateChart = function () {
        var chart = new CanvasJS.Chart("spendingData", {
            theme: "theme2",//theme1
            title: {
                text: self.SelectedItem().Name()
            },
            animationEnabled: true,   // change to true
            data: [
            {
                // Change type to "bar", "area", "spline", "pie",etc.
                type: "column",
                dataPoints: [
                    { label: "January", y: self.SelectedItem().January() },
                    { label: "February", y: self.SelectedItem().February() },
                    { label: "March", y: self.SelectedItem().March() },
                    { label: "April", y: self.SelectedItem().April() },
                    { label: "May", y: self.SelectedItem().May() },
                    { label: "June", y: self.SelectedItem().June() },
                    { label: "July", y: self.SelectedItem().July() },
                    { label: "August", y: self.SelectedItem().August() },
                    { label: "September", y: self.SelectedItem().September() },
                    { label: "October", y: self.SelectedItem().October() },
                      { label: "November", y: self.SelectedItem().November() },
                    { label: "December", y: self.SelectedItem().December() }
                ]
            }
            ]
        });
        chart.render();
    }

    self.SelectedItem.subscribe(function () {
        self.UpdateChart();
    }, null, "change");


}