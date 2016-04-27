using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using ReichenbergProject3.DataContexts;
using ReichenbergProject3.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ReichenbergProject3.Controllers
{
    [Authorize]
    public class HomeController : Controller
    {
        private ItemsDb _db = new ItemsDb();

        protected override void Dispose(bool disposing)
        {
            _db.Dispose();
            base.Dispose(disposing);
        }

        /// <summary>
        /// Index view for monthly spending app
        /// </summary>
        /// <returns>View with list of items</returns>
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        #region MonthlySpendingMethods

        /// <summary>
        /// Get a new list of items to pass to the view
        /// </summary>
        /// <returns>List of Item objects</returns>
        [HttpPost]
        public JsonResult UpdateItemData()
        {
            ApplicationUser currentUser = GetUser();
            var items = currentUser.Items.ToList();
            return Json(items,JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// Adds a new Item to the user's list of items
        /// </summary>
        /// <param name="item">Item to add to the user</param>
        /// <returns>JsonResult detailing success or failure of Creating new Item</returns>
        public JsonResult Create(string name)
        {
            try
            {
                var success = new { Success = "True", Message = "Item successfully added!" };

                var user = GetUser();
                if (name == null)
                {
                    throw new ArgumentNullException("Item Name cannot be null.");
                }
                else
                {
                    Item item = new Item();
                    item.Name = name;
                    user.Items.Add(item);
                    _db.Entry(user).State = EntityState.Modified;
                    _db.SaveChanges();
                }

                return Json(success, JsonRequestBehavior.AllowGet);
            }
            catch(Exception e)
            {
                if(e is ArgumentNullException)
                {
                    var fail = new { Success = "False", Message = e.Message };
                    return Json(fail);
                }
                else
                {
                    var fail = new { Success = "False", Message = "Error Adding New Item." };
                    return Json(fail);
                }
                
            }
        }

        /// <summary>
        /// Get the current Application user logged into the system
        /// </summary>
        /// <returns>Application User</returns>
        public ApplicationUser GetUser()
        {

            var manager = new UserManager<ApplicationUser>(
            new UserStore<ApplicationUser>(_db));
            var currentUser = manager.FindById(User.Identity.GetUserId());
            return currentUser;
        }

        public JsonResult Delete(int Id)
        {
            try
            {
                var success = new { Success = "True", Message = "Item successfully Deleted." };
                var user = GetUser();
                var itemToRemove = user.Items.Where(i => i.Id == Id).FirstOrDefault();
                if (itemToRemove != null)
                {
                    user.Items.Remove(itemToRemove);
                    _db.Entry(user).State = EntityState.Modified;
                    _db.Items.Remove(itemToRemove);
                    _db.SaveChanges();
                    return Json(success, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    throw new ArgumentNullException("The item could not be found to be removed");
                }
            }
            catch(Exception e)
            {
                if (e is ArgumentNullException)
                {
                    var fail = new { Success = "False", Message = e.Message };
                    return Json(fail);
                }
                else
                {
                    var fail = new { Success = "False", Message = "Error Deleting Item." };
                    return Json(fail);
                }
            }
        }

        /// <summary>
        /// Adds a new Item to the user's list of items
        /// </summary>
        /// <param name="item">Item to add to the user</param>
        /// <returns>JsonResult detailing success or failure of Creating new Item</returns>
        public JsonResult Update(int id, string month, string action,double amount)
        {
            try
            {
                var success = new { Success = "True", Message = "Item successfully added!" };

                //Check input for invalid data
                if(String.IsNullOrWhiteSpace(month) || String.IsNullOrWhiteSpace(action))
                {
                    throw new ArgumentNullException("Month and Action Cannot be empty");
                }
                else if(amount <= 0)
                {
                    throw new ArgumentOutOfRangeException("Amount must be greater than 0");
                }
                var user = GetUser();

                switch (action)
                {
                    case "Increase":
                        break;
                    case "Decrease":
                        break;
                    case "Reset:":
                        break;
                }
                return Json(success, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                if (e is ArgumentNullException)
                {
                    var fail = new { Success = "False", Message = e.Message };
                    return Json(fail);
                }
                else
                {
                    var fail = new { Success = "False", Message = "Error Adding New Item." };
                    return Json(fail);
                }

            }
        }

        public void Increase(string month, double amount, int id)
        {
            var user = GetUser();
            var item = user.Items.Where(i => i.Id == id).FirstOrDefault();
            switch (month)
            {
                case "January":
                    item.January += amount;
                    break;
                case "February":
                    item.February += amount;
                    break;
                case "March":
                    item.March += amount;
                    break;
                case "April":
                    item.April += amount;
                    break;
                case "May":
                    item.May += amount;
                    break;
                case "June":
                    item.June += amount;
                    break;
                case "July":
                    item.July += amount;
                    break;
                case "August":
                    item.August += amount;
                    break;
                case "September":
                    item.September += amount;
                    break;
                case "October":
                    item.October += amount;
                    break;
                case "November":
                    item.November += amount;
                    break;
                case "December":
                    item.December += amount;
                    break;
            }

        }

        #endregion
    }
}