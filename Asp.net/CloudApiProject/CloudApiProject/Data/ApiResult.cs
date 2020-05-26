using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Linq.Dynamic.Core;
using System.Reflection;


namespace CloudApiProject.Data
{
    public class ApiResult<T>
    {
        private ApiResult( 
            List<Case> data, 
            int count,
            int  pageIndex, 
            int pageSize, 
            string sortColumn, 
            string sortOrder, 
            string filterColumn,
            string filterQuery,
            int? pricemax,
            int? pricemin,
            int? gpuLengthMax,
            int? gpuLengthMin,
            int? volumeMin,
            int? volumeMax
            
            )
        {
            Data = data;
            PageIndex = pageIndex;
            PageSize = pageSize;
            TotalCount = count;
            TotalPages = (int)Math.Ceiling(count / (double)pageSize);
            SortColumn = sortColumn;
            SortOrder = sortOrder;
            FilterColumn = filterColumn;
            FilterQuery = filterQuery;
            Pricemax = pricemax;
            Pricemin = pricemin;
            GpuLengthMax = gpuLengthMax;
            GpuLengthMin = gpuLengthMin;
            VolumeMin = volumeMin;
            VolumeMax = volumeMax;
        }
        public static async Task<ApiResult<T>> CreateAsync(
            IQueryable<Case> source,
            int pageIndex,
            int pageSize,

            int? pricemax = null,
            int? pricemin = null,
            int? gpuLengthMax = null,
            int? gpuLengthMin = null,
            int? volumeMin = null,
            int? volumeMax = null,

            string sortColumn = null,
            string sortOrder = null,
            string filterColumn = null,
            string filterQuery = null
            
            )
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

            if (gpuLengthMin.HasValue && gpuLengthMax.HasValue)
                source = source.Where(d => d.GPULength >= gpuLengthMin && d.GPULength <= gpuLengthMax);

            if (pricemin.HasValue && pricemax.HasValue)
                source = source.Where(d => d.Cost >= pricemin && d.Cost <= pricemax);

            if (volumeMin.HasValue && volumeMax.HasValue)
                source = source.Where(d => d.Volume >= volumeMin && d.Volume <= volumeMax);

            var count = await source.CountAsync();

            if (!String.IsNullOrEmpty(sortColumn)
            && IsValidProperty(sortColumn))
            {
                sortOrder = !String.IsNullOrEmpty(sortOrder)
                && sortOrder.ToUpper() == "ASC"
                ? "ASC"
                : "DESC";

                
                source = source.AsQueryable().OrderBy
                    (String.Format(
                    "{0} {1}",
                    sortColumn,
                    sortOrder
                    ));
            }

            source = source
                .Skip(pageIndex * pageSize)
                .Take(pageSize);
            var data = await source.ToListAsync();

            return new ApiResult<T>(
                data, 
                count, 
                pageIndex, 
                pageSize, 

                sortColumn, 
                sortOrder, 
                filterColumn,
                filterQuery,
                pricemax,
                pricemin,
                gpuLengthMax,
                gpuLengthMin,
                volumeMin,
                volumeMax

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
        public string SortColumn { get; set; }
        public string SortOrder { get; set; }
        
        public string FilterColumn { get; set; }
        public string FilterQuery { get; set; }
        public int? Pricemin { get; }
        public int? Pricemax { get; set; }
        public int? GpuLengthMin { get; }
        public int? GpuLengthMax { get; }
        public int? VolumeMin { get; }
        public int? VolumeMax { get; }

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

        public List<Case> Data { get; private set; }
    }
}
