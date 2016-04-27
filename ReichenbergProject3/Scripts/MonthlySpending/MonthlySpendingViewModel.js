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
            },
            error: function (data) {
                alert("Error getting items.");
            }
        });
    }


}