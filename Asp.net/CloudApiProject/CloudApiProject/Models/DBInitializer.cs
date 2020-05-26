using System.Linq;

namespace CloudApiProject.Models
{
    public class DBInitializer
    {
        public static void Initialize(LibraryContext context)
        {
            Brand brand1 = null;

            context.Database.EnsureCreated();
            if (!context.Brands.Any())
            {
                brand1 = new Brand()
                {
                    Name = "NCASE",
                    Founder = "Tony Osibov",
                    CEO = "KABIR VAID",
                };
                context.Brands.Add(brand1);
                context.SaveChanges();
            }

            if (!context.Gpus.Any())
            {
                var GPU1 = new Gpu()
                {
                    ComputerChipManufacturer = "Nvidia",
                    BrandName = "Inno3D",
                    Cores = 2560,
                    Cost = 559,
                    Generation = "GeForce RTX 2000",
                    Length = 266.74,
                    Memory = 8,
                    Name = "Inno3D GeForce RTX 2070 Super Twin  X2 OC",
                    PicSrc = "https://tweakers.net/i/AIv68niEpbcYv9YegfVSq4VqX_Y=/fit-in/656x/filters:strip_icc():strip_exif()/i/2002914392.jpeg?f=imagenormal",
                    TypeMemory = "GDDR6",
                    VideoChip = "GeForce RTX 2070 Super",
                    Width = 115.7,
                    LinkFab = "http://www.inno3d.com/products_detail.php?refid=481",
                };
                context.Gpus.Add(GPU1);
                context.SaveChanges();
            }

            if (!context.Cases.Any())
            {
                var case1 = new Case()
                {
                    CaseName = "NCASE M1",
                    CaseBrand = brand1,
                    ProductLink = "https://ncases.com/products/m1",
                    Cost = 210,
                    Type = "Mini-ITX",
                    L = 328,
                    W = 160,
                    H = 240,
                    Volume = 12.6,
                    Footprint = 81,
                    Storage = "2xHDD + 2xSSD + 1xANY",
                    PsuType = "SFX(L)",
                    GPULength = 317,
                    ExpansionSlots = 3,
                    CoolerHeight = 130,
                    FanSupport = "S: 2x120mm, B: 2x120mm, R: 1x92mm",
                    RadiatorSupport = "S: 240mm",
                    Comments = "GPU: 111-140mm(W), can fit motherboards up to 226mm x 174mm with ATX PSU and up to 226mm x 95mm when using an SFX PSU with the ATX bracket"
                };
                context.Cases.Add(case1);
                context.SaveChanges();
            }
        }
    }
}
