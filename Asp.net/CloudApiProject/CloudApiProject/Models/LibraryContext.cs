
using Microsoft.EntityFrameworkCore;

namespace CloudApiProject.Models
{
    public class LibraryContext : DbContext
    {
        public LibraryContext ( DbContextOptions<LibraryContext> options) : base(options)
        {

        }
        public DbSet<Case> Cases { get; set; }
        public DbSet<Brand> Brands { get; set; }
        public DbSet<Gpu> Gpus { get; set; }
        //public DbSet<Gpucase> gpucases { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            


            //modelBuilder.Entity<Gpucase>()
            //    .HasKey(gpucase => new { gpucase.CaseId, gpucase.GpuId });

            //modelBuilder.Entity<Gpucase>()
            //    .HasOne(gpucase => gpucase.Ccase)
            //    .WithMany(gc => gc.Gpucases)
            //    .HasForeignKey(fk => fk.CaseId);

            //modelBuilder.Entity<Gpucase>()
            //    .HasOne(gpucase => gpucase.gpu)
            //    .WithMany(gc => gc.Gpucases)
            //    .HasForeignKey(fk => fk.GpuId);


        }
    }



}