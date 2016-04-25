$(function () {
    var viewModel = MonthlySpendingViewModel();
    ko.applyBindings(viewModel);

    //Get user's items on page load
    $.ajax({
        type: "GET",
        url: "/home/UpdateItemData",
        success: function (data) {
            viewModel.Items = ko.observableArray();
            for (item in data) {
                viewModel.Items.push(new Item(data[item]));
            }
        },
        error: function (data) {
            alert("Error getting items.");
        }
    });
});