using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CloudApiProject.Data;
using CloudApiProject.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CloudApiProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BrandController : ControllerBase
    {
        private readonly LibraryContext context;
        public BrandController(LibraryContext context)
        {
            this.context = context;
        }


        [HttpGet]
        public List<Brand> GetallBrands(string brand, int? page, string sort, string dir = "asc")
        {
            IQueryable<Brand> query = context.Brands;

            if (!string.IsNullOrWhiteSpace(brand))
                query = query.Where(d => d.Name.Contains(brand));

            if (!string.IsNullOrWhiteSpace(sort)){
                switch (sort)
                {
                    case "name":
                        if (dir == "asc")
                            query = query.OrderBy(d => d.Name);
                        else if (dir == "desc")
                            query = query.OrderByDescending(d => d.Name);
                        break;

                    case "founded":
                        if (dir == "asc")
                            query = query.OrderBy(d => d.Founded);
                        else if (dir == "desc")
                            query = query.OrderByDescending(d => d.Founded);
                        break;
                }
            }

            return query.ToList();
        }

        [Route("v2")]
        [HttpGet]
        public async Task<ActionResult<ApiBrandResult<Brand>>> getpaging(
            int pageIndex = 0, 
            int pageSize = 10,
            string sortColumn = null,
            string sortOrder = null

            )
        {
            return await ApiBrandResult<Brand>.CreateAsync(
                context.Brands,
                pageIndex,
                pageSize,
                sortColumn,
                sortOrder
                );
        }
        [Route("{id}")]
        [HttpGet]
        public  ActionResult<Brand> getBrand(int id)
        {
            var Brand =  context.Brands
                .Include(d => d.cases)
                .SingleOrDefault(d => d.Id == id);

            if (Brand == null)
            {
                return NotFound();
            }

            return Brand;
        }
        [Route("casesfromBrand/{id}")]
        [HttpGet]
        public IActionResult getCasesFromBrand(int id)
        {
           var Brand =  context.Brands
              .Include(d => d.cases)
              .SingleOrDefault(d => d.Id == id);

            var Cases = Brand.cases;
            if (Brand == null)
            {
                return NotFound();
            }

            return Ok(Cases);
        }

        [Authorize]
        [Route("{id}")]
        [HttpDelete]
        public IActionResult DeleteBrand(int id)
        {
            var Brand = context.Brands.Find(id);
            if (Brand == null)
            {
                return NotFound();
            }
            context.Brands.Remove(Brand);
            context.SaveChanges();
            //standaard response 204 bij gelukte delete
            return NoContent();
        }
        //api/brand/id
        [Authorize]
        [Route("{id}")]
        [HttpPut]
        public IActionResult UpdateBrand([FromBody] Brand updateBrand, int id)
        {
            var orgBrand = context.Brands.Find(id);
            if (orgBrand == null)
                return NotFound();

            orgBrand.Name = updateBrand.Name;
            orgBrand.Founder = updateBrand.Founder;
            orgBrand.Founded = updateBrand.Founded;
            orgBrand.CEO = updateBrand.CEO;
            orgBrand.Headquarters = updateBrand.Headquarters;

            context.SaveChanges();
            return Ok(orgBrand);
        }
        [Authorize]
        [HttpPost]
        public IActionResult CreateBrand([FromBody] Brand newBrand)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            context.Brands.Add(newBrand);
            context.SaveChanges();
            //stuur een result 201 met het boek als content
            return Created("", newBrand);
        }
    }
}