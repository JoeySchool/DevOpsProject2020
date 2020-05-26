using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Linq.Dynamic.Core;
using System.Reflection;
using CloudApiProject.Models;
using Microsoft.AspNetCore.Mvc;

namespace CloudApiProject.Data
{
    public class ApiBrandResult<T>
    {
        private ApiBrandResult(
            List<Brand> data,
            int count,
            int pageIndex,
            int pageSize,
            string filterColumn,
            string filterQuery

            )
        {
            Data = data;
            PageIndex = pageIndex;
            PageSize = pageSize;
            TotalPages = (int)Math.Ceiling(count / (double)pageSize);
            TotalCount = count;
            FilterColumn = filterColumn;
            FilterQuery = filterQuery;

        }
        public static async Task<ApiBrandResult<T>> CreateAsync(
            IQueryable<Brand> source,
            int pageIndex,
            int pageSize,
            string filterColumn = null,
            string filterQuery = null)
        {
            if (!String.IsNullOrEmpty(filterColumn)
            && !String.IsNullOrEmpty(filterQuery)
            && IsValidProperty(filterColumn))
            {
                source = source.Where(
                String.Format("{0}.Contains(@0)",
                filterColumn),
                filterQuery);
            }
            var count = await source.CountAsync();


            source = source
                .Skip(pageIndex * pageSize)
                .Take(pageSize);
            var data = await source.ToListAsync();

            return new ApiBrandResult<T>(
                data,
                count,
                pageIndex,
                pageSize,
                filterColumn,
                filterQuery


                );
        }

        public static bool IsValidProperty(
             string propertyName,
             bool throwExceptionIfNotFound = true)
        {
            var prop = typeof(T).GetProperty(
            propertyName,
            BindingFlags.IgnoreCase |
            BindingFlags.Public |
            BindingFlags.Instance);
            if (prop == null && throwExceptionIfNotFound)
                throw new NotSupportedException(
                String.Format(
                "ERROR: Property '{0}' does not exist.",
                propertyName)
                );
            return prop != null;
        }
        public int PageIndex { get; private set; }
        public int PageSize { get; private set; }
        public int TotalCount { get; private set; }
        public int TotalPages { get; private set; }
        public string FilterColumn { get; set; }
        public string FilterQuery { get; set; }
        public List<Brand> Data { get; private set; }
        public bool HasPreviousPage
        {
            get
            {
                return (PageIndex > 0);
            }
        }
        public bool HasNextPage
        {
            get
            {
                return ((PageIndex + 1) < TotalPages);
            }
        }
    }
}
