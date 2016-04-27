function Item(data) {
    var self = this;
    if (data) {
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
    else {
        self.Id = ko.observable(0);
        self.Name = ko.observable("");

        self.January = ko.observable(0);
        self.February = ko.observable(0);
        self.March = ko.observable(0);
        self.April = ko.observable(0);
        self.May = ko.observable(0);
        self.June = ko.observable(0);
        self.July = ko.observable(0);
        self.August = ko.observable(0);
        self.September = ko.observable(0);
        self.October = ko.observable(0);
        self.November = ko.observable(0);
        self.December = ko.observable(0);
    }
}