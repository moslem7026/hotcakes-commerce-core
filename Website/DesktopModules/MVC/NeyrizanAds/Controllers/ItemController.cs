/*
' Copyright (c) 2019 Moslem Pasokh
'  All rights reserved.
' 
' THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
' TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
' THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
' CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
' DEALINGS IN THE SOFTWARE.
' 
*/

using System;
using System.Linq;
using System.Web.Mvc;
using Moslem7026.Modules.NeyrizanAds.Components;
using Moslem7026.Modules.NeyrizanAds.Models;
using DotNetNuke.Web.Mvc.Framework.Controllers;
using DotNetNuke.Web.Mvc.Framework.ActionFilters;
using DotNetNuke.Entities.Users;
using DotNetNuke.Framework.JavaScriptLibraries;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace Moslem7026.Modules.NeyrizanAds.Controllers
{
    public class nobat
    {
        public int ID { get; set; }
        public DateTime DateOfPublish { get; set; }
        public DateTime DateofInsert { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
    }
    [DnnHandleError]
    public class ItemController : DnnController
    {
        public ActionResult getNobats()
        {
            List<nobat> lstNobat = new List<nobat>();
            lstNobat.Add(new nobat() { ID = 1, Title = "اول - 1398/07/01", DateofInsert=DateTime.Now });
            lstNobat.Add(new nobat() { ID = 2, Title = "دوم -  1398/07/08" });
            return Content(JsonConvert.SerializeObject(lstNobat), "application/json");
        }
        [HttpPost]
        public ActionResult getPagesOfNobat(int NobatID)
        {
            List<nobat> lstNobat = new List<nobat>();
            lstNobat.Add(new nobat() { ID = 1, Title = "اول", DateofInsert = DateTime.Now });
            lstNobat.Add(new nobat() { ID = 2, Title = "دوم" });
            return Content(JsonConvert.SerializeObject(lstNobat), "application/json");
        }
        public ActionResult getPagesOfNobat()
        {
            List<nobat> lstNobat = new List<nobat>();
            lstNobat.Add(new nobat() { ID = 1, Title = "sadf", DateofInsert = DateTime.Now });
            lstNobat.Add(new nobat() { ID = 2, Title = "asdfsdf" });
            return Content(JsonConvert.SerializeObject(lstNobat), "application/json");
        }
        public ActionResult Delete(int itemId)
        {
            ItemManager.Instance.DeleteItem(itemId, ModuleContext.ModuleId);
            return RedirectToDefaultRoute();
        }

        public ActionResult Edit(int itemId = -1)
        {
            DotNetNuke.Framework.JavaScriptLibraries.JavaScript.RequestRegistration(CommonJs.DnnPlugins);

            var userlist = UserController.GetUsers(PortalSettings.PortalId);
            var users = from user in userlist.Cast<UserInfo>().ToList()
                        select new SelectListItem { Text = user.DisplayName, Value = user.UserID.ToString() };

            ViewBag.Users = users;

            var item = (itemId == -1)
                 ? new Item { ModuleId = ModuleContext.ModuleId }
                 : ItemManager.Instance.GetItem(itemId, ModuleContext.ModuleId);

            return View(item);
        }

        [HttpPost]
        [DotNetNuke.Web.Mvc.Framework.ActionFilters.ValidateAntiForgeryToken]
        public ActionResult Edit(Item item)
        {
            if (item.ItemId == -1)
            {
                item.CreatedByUserId = User.UserID;
                item.CreatedOnDate = DateTime.UtcNow;
                item.LastModifiedByUserId = User.UserID;
                item.LastModifiedOnDate = DateTime.UtcNow;

                ItemManager.Instance.CreateItem(item);
            }
            else
            {
                var existingItem = ItemManager.Instance.GetItem(item.ItemId, item.ModuleId);
                existingItem.LastModifiedByUserId = User.UserID;
                existingItem.LastModifiedOnDate = DateTime.UtcNow;
                existingItem.ItemName = item.ItemName;
                existingItem.ItemDescription = item.ItemDescription;
                existingItem.AssignedUserId = item.AssignedUserId;

                ItemManager.Instance.UpdateItem(existingItem);
            }

            return RedirectToDefaultRoute();
        }

        [ModuleAction(ControlKey = "Edit", TitleKey = "AddItem")]
        public ActionResult Index()
        {
            var items = ItemManager.Instance.GetItems(ModuleContext.ModuleId);
            return View(items);
        }
    }
}
