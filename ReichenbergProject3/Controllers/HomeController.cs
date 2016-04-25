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
            ApplicationUser currentUser = GetUser();
            var items = currentUser.Items.ToList();
            return View(items);
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
        public JsonResult Create(Item item)
        {
            try
            {
                var success = new { Success = "True", Message = "Item successfully added!" };

                var user = GetUser();
                if (item.Name == null)
                {
                    throw new ArgumentNullException("Item Name cannot be null.");
                }
                else
                {
                    user.Items.Add(item);
                    _db.Entry(user).State = EntityState.Modified;
                    _db.SaveChanges();
                }

                return Json(success);
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
            new UserStore<ApplicationUser>(new ItemsDb()));
            var currentUser = manager.FindById(User.Identity.GetUserId());
            return currentUser;
        }

        #endregion
    }
}