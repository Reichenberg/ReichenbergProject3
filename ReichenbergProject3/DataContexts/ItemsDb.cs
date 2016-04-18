using Microsoft.AspNet.Identity.EntityFramework;
using ReichenbergProject3.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReichenbergProject3.DataContexts
{
    public class ItemsDb : IdentityDbContext<ApplicationUser>
    {
        public ItemsDb()
            : base("DefaultConnection", throwIfV1Schema: false)
        {
        }

        public static ItemsDb Create()
        {
            return new ItemsDb();
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<IdentityRole>().HasKey<string>(r => r.Id);
            modelBuilder.Entity<IdentityUserRole>().HasKey(r => new { r.RoleId, r.UserId });
        }

        public DbSet<Item> Items { get; set; }
    }
}
