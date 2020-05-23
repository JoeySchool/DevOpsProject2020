using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CloudApiProject.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CloudApiProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GetallController : ControllerBase
    {
        private readonly LibraryContext context;
        public GetallController(LibraryContext context)
        {
            this.context = context;
        }

        public Getall GetTotalvalue()
        {
            Getall getall = new Getall();

            getall.Brands = context.Brands.Count();
            getall.Cases = context.Cases.Count();
            getall.Gpus = context.Gpus.Count();

            return getall;
        }



    }
}