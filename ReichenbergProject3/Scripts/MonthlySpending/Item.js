function Item(data) {
    var self = this;
    self.Id = ko.observable(data.Id);
    self.Name = ko.observable(data.Name);

    self.January = ko.observable(data.January);
    self.February = ko.observable(data.February);
    self.March = ko.observable(data.March);
    self.April = ko.observable(data.April);
    self.May = ko.observable(data.May);
    self.June = ko.observable(data.June);
    self.July = ko.observable(data.July);
    self.August = ko.observable(data.August);
    self.September = ko.observable(data.September);
    self.October = ko.observable(data.October);
    self.November = ko.observable(data.November);
    self.December = ko.observable(data.December);
}