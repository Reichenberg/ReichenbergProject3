function MonthlySpendingViewModel() {
    var self = this;

    self.Items = ko.observableArray();
    self.SelectedItem = ko.observable();
}