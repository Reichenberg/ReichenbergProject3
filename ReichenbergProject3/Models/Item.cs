using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReichenbergProject3.Models
{
    /// <summary>
    /// Item class for user 
    /// </summary>
    public class Item
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }

        [Range(0,Double.MaxValue)]
        public double January { get; set; }
        [Range(0, Double.MaxValue)]
        public double February { get; set; }
        [Range(0, Double.MaxValue)]
        public double March { get; set; }
        [Range(0, Double.MaxValue)]
        public double April { get; set; }
        [Range(0, Double.MaxValue)]
        public double May { get; set; }
        [Range(0, Double.MaxValue)]
        public double June { get; set; }
        [Range(0, Double.MaxValue)]
        public double July { get; set; }
        [Range(0, Double.MaxValue)]
        public double August { get; set; }
        [Range(0, Double.MaxValue)]
        public double September { get; set; }
        [Range(0, Double.MaxValue)]
        public double October { get; set; }
        [Range(0, Double.MaxValue)]
        public double November { get; set; }
        [Range(0, Double.MaxValue)]
        public double December { get; set; }

    }
}
