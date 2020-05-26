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
    [Route ("api/case")]
    
    public class CaseController : ControllerBase
    {
        
        private readonly LibraryContext context;
        public CaseController(LibraryContext context)
        {
            this.context = context;
        }


        [HttpGet]
        public List<Case> GetAllCases(string name, 
            int? pricemax, 
            int? pricemin,
            int? gpuLengthMax, 
            int? gpuLengthMin, 
            int? volumeMin, 
            int? volumeMax, 
            int? page, 
            string sort, 
            int length = 10, 
            string dir = "asc")
        {
            IQueryable<Case> query = context.Cases;

            if (!string.IsNullOrWhiteSpace(name) && name != "undefined")
                query = query.Where(d => d.CaseName.Contains(name));

            if (gpuLengthMin.HasValue && gpuLengthMax.HasValue)
            query = query.Where(d => d.GPULength >= gpuLengthMin && d.GPULength <= gpuLengthMax );

            if (pricemin.HasValue && pricemax.HasValue)
                query = query.Where(d => d.Cost >= pricemin && d.Cost <= pricemax);

            if (volumeMin.HasValue && volumeMax.HasValue)
                query = query.Where(d => d.Volume >= volumeMin && d.Volume <= volumeMax);



            //if (!string.IsNullOrWhiteSpace(gpumax.ToString()))
            //{
            //    query = query.Where(d => d.GPULength <= gpumax);
            //}

            if (!string.IsNullOrWhiteSpace(sort))
            {
                switch (sort)
                {
                    case "name":
                        if (dir == "asc")
                            query = query.OrderBy(d => d.CaseName);
                        else if (dir == "desc")
                            query = query.OrderByDescending(d => d.CaseName);
                        break;
                    case "brand":
                        if (dir == "asc")
                            query = query.OrderBy(d => d.CaseBrand);
                        else if (dir == "desc")
                            query = query.OrderByDescending(d => d.CaseBrand);
                        break;

                    case "volume":
                        if (dir == "asc")
                            query = query.OrderBy(d => d.Volume);
                        else if (dir == "desc")
                            query = query.OrderByDescending(d => d.Volume);
                        break;

                    case "psu":
                        if (dir == "asc")
                            query = query.OrderBy(d => d.PsuType);
                        else if (dir == "desc")
                            query = query.OrderByDescending(d => d.PsuType);
                        break;

                    case "coolerheight":
                        if (dir == "asc")
                            query = query.OrderBy(d => d.CoolerHeight);
                        else if (dir == "desc")
                            query = query.OrderByDescending(d => d.CoolerHeight);
                        break;

                    case "cost":
                        if (dir == "asc")
                            query = query.OrderBy(d => d.Cost);
                        else if (dir == "desc")
                            query = query.OrderByDescending(d => d.Cost);
                        break;

                    case "gpulength":
                        if (dir == "asc")
                            query = query.OrderBy(d => d.GPULength);
                        else if (dir == "desc")
                            query = query.OrderByDescending(d => d.GPULength);
                        break;
                }
            }

            if (page.HasValue)
            query = query.Skip(page.Value * length);
            query = query.Take(length);
            return query.ToList();
            
                
        }



        // GET: api/Case/test/?pageIndex=0&pageSize=10&sortColumn=name&sortOrder=asc


        [Route("v2")]
        [HttpGet]
        public async Task<ActionResult<ApiResult<Case>>> GetCases(
            int pageIndex = 0, 
            int pageSize = 10, 
            string sortColumn = null, 
            string sortOrder = null,
            string filterColumn = null,
            string filterQuery = null,
            int? pricemax = null, 
            int? pricemin = null, 
            int? gpuLengthMax = null, 
            int? gpuLengthMin = null, 
            int? volumeMin = null, 
            int? volumeMax = null
            )
        {
            return await ApiResult<Case>.CreateAsync(
            context.Cases,
            pageIndex,
            pageSize,

            pricemax,
            pricemin,
            gpuLengthMax,
            gpuLengthMin,
            volumeMin,
            volumeMax,

            sortColumn,
            sortOrder,
            filterColumn,
            filterQuery
            );

        }

        [Authorize]
        [Route("hi")]
        [HttpGet]
        public IActionResult sayHi()
        {
            return Content("Welcome to my api!");
        }



        [Route("{id}")]
        [HttpGet]
        public IActionResult getCase(int id)
        {
            var Case = context.Cases
                .Include(d => d.CaseBrand)
                .SingleOrDefault(d => d.Id == id);

            if (Case == null)
            {
                return NotFound();
            }

            return Ok(Case);
        }

        [Route("{id}/brand")]
        [HttpGet]
        public IActionResult GetBrandfromCase(int id)
        {

            var Case = context.Cases
                .Include(d => d.CaseBrand)
                .SingleOrDefault(d => d.Id == id);

            
            


            if (Case == null)
            {
                return BadRequest("Case with id: "+ id + " does not  have a brand");
            }
            var brand = Case.CaseBrand;

            if (brand == null)
                return BadRequest("Case with id: " + id + " does not have a brand assigned");

            return Ok(brand);
        }
        //[Route("fitgpu")]
        //[HttpGet]
        
 

        [Authorize]
        [Route("{id}")]
        [HttpDelete]
        public IActionResult DeleteCase(int id)
        {
            var Case = context.Cases.Find(id);
            if (Case == null)
            {
                return NotFound();
            }
            context.Cases.Remove(Case);
            context.SaveChanges();
            //standaard response 204 bij gelukte delete
            return NoContent();
        }
        [Authorize]
        [Route("{id}")]
        [HttpPut]
        public IActionResult UpdateCase([FromBody] Case updateCase, int id)
        {
            var orgCase = context.Cases.Find(updateCase.Id);
            if (orgCase == null)
                return BadRequest();

            orgCase.CaseBrand = updateCase.CaseBrand;
            orgCase.Cost = updateCase.Cost;
            orgCase.Type = updateCase.Type;
            orgCase.L = updateCase.L;
            orgCase.W = updateCase.W;
            orgCase.H = updateCase.H;
            orgCase.Volume = updateCase.Volume;
            orgCase.Footprint = updateCase.Footprint;
            orgCase.Storage = updateCase.Storage;
            orgCase.PsuType = updateCase.PsuType;
            orgCase.GPULength = updateCase.GPULength;
            orgCase.ExpansionSlots = updateCase.ExpansionSlots;
            orgCase.CoolerHeight = updateCase.CoolerHeight;
            orgCase.FanSupport = updateCase.FanSupport;
            orgCase.RadiatorSupport = updateCase.RadiatorSupport;
            orgCase.Comments = updateCase.Comments;

            context.SaveChanges();
            return Ok(orgCase);
        }
        [Authorize]
        [HttpPost]
        public IActionResult CreateCase([FromBody] Case newCase)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            context.Cases.Add(newCase);
            context.SaveChanges();
            //stuur een result 201 met het boek als content
            return Created("", newCase);
        }
    }
}