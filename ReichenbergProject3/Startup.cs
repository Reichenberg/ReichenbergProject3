using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(ReichenbergProject3.Startup))]
namespace ReichenbergProject3
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
