$(function () {
    var viewModel = new MonthlySpendingViewModel();
    

    //Get user's items on page load
    $.ajax({
        type: "POST",
        url: "Home/UpdateItemData",
        success: function (data) {
            if (data.length > 0) {
                var mappedItems = $.map(data, function (item) { return new Item(item); });
                viewModel.Items(mappedItems);
                ko.applyBindings(viewModel);
            }
        },
        error: function (data) {
            alert("Error getting items.");

        }
    });
    
});