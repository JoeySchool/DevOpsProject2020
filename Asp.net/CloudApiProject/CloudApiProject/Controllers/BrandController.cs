using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
                query = query.Where(d => d.Name == brand);

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
        [Route("{id}")]
        [HttpGet]
        public IActionResult getCase(int id)
        {
            var Brand = context.Brands
                .Include(d => d.cases)
                .SingleOrDefault(d => d.Id == id);

            if (Brand == null)
            {
                return NotFound();
            }

            return Ok(Brand);
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
        [Authorize]
        [Route("{id}")]
        [HttpPut]
        public IActionResult UpdateBrand([FromBody] Brand updateBrand)
        {
            var orgBrand = context.Brands.Find(updateBrand.Id);
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